import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import axios from 'axios';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    try {
      const response = await axios.get(`http://localhost:1337/api/items/${itemId}?populate=image`);
      setItem(response.data.data); // Assuming your data is structured similarly with Axios
    } catch (error) {
      console.error('Error fetching item:', error);
      // Handle error as needed
    }
  }

  async function getItems() {
    try {
      const response = await axios.get(`http://localhost:1337/api/items?populate=image`);
      
      setItems(response.data.data); // Assuming your data is structured similarly with Axios
      console.log(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error fetching items:', error);
      // Handle error as needed
    }
  }
  
  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getItem();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    category = "",
    price = 0,
    name = "",
    image = { data: { attributes: { formats: { medium: { url: "" } } } } },
    longDescription = [{ children: [{ text: "" }] }],
  } = item?.attributes || {};

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${image.data.attributes.formats.medium.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{name}</Typography>
            <Typography>${price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {longDescription[0]?.children[0]?.text}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{longDescription[0]?.children[0]?.text}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 3).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;