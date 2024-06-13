import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);{/*Represent the number of item add to the cart */}
    const [isHovered, setIsHovered] = useState(false);{/*User hoverd mouse or not*/}
    const {
      palette: { neutral },
    } = useTheme();
  
    const { category, price, name, image } = item.attributes;{/*item object */}
    const {
      data: {
        attributes: {
          formats: {
            medium: { url },
          },
        },
      },
    } = image; {/*Getting image data(image url) from item */}
  
    return (
      <Box width={width}>
        <Box
          position="relative"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <img
            alt={item.name}
            width="300px" 
            height="400px"
            src={`http://localhost:1337${url}`}
            onClick={() => navigate(`/item/${item.id}`)} // navigate to item details page{/*item object */}
            style={{ cursor: "pointer" }}
          />

          
          <Box
            display={isHovered ? "block" : "none"}
            position="absolute"
            bottom="10%"
            left="0"
            width="100%"
            padding="0 5%"
          >
            <Box display="flex" justifyContent="space-between">
                {/*plus and minus buttons */}
              <Box
                display="flex"
                alignItems="center"
                backgroundColor={shades.neutral[100]}
                borderRadius="3px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>{/*.max(count - 1, 1) for item count not below zero */}
                  <RemoveIcon />
                </IconButton>
                <Typography color={shades.primary[300]}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>

              {/*Button add to cart*/}
              <Button
                onClick={() => {
                  dispatch(addToCart({ item: { ...item, count } })); // how much items are added to cart
                }}
                sx={{ backgroundColor: shades.primary[300], color: "white" }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
  
        <Box mt="3px">
          <Typography variant="subtitle2" color={neutral.dark}>
            {category
              .replace(/([A-Z])/g, " $1")//{/* regex for replacing the values of catergory given*/}
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
          <Typography>{name}</Typography>
          <Typography fontWeight="bold">${price}</Typography>
        </Box>
      </Box>
    );
  };
  
  export default Item;