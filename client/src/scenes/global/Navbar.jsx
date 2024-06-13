import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton } from '@mui/material';
import {
    Person,
    MenuOutlined,
    SearchOutlined
} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { setIsCartOpen } from '../../state';


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    
    return (
    <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor="rgba(255,255,255,0.95)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
    >
        <Box
            width="85%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Box
                onClick={() => navigate("/")}
                sx={{'&:hover':{cursor:"pointer"}}}
                color={shades.secondary[400]}
                fontSize="20px"
                fontWeight="bold"
            >
                ECOMMER
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                columnGap="12px"
                zIndex="2"

            >
                <IconButton sx={{color: "black"}}>
                    <SearchOutlined sx={{height:"25px", width: "25px"}} />
                </IconButton>

                <IconButton sx={{color: "black"}}>
                    <Person sx={{height:"25px", width: "25px"}} />
                </IconButton>

                <Badge
                    badgeContent={cart.length}
                    color="secondary"
                    invisible={cart.length === 0}
                    sx={{
                        "& .MuiBadge-badge": {
                            right: 5,
                            top: 5,
                            padding: "0 4px",
                            height: "14px",
                            minWidth: "13px",
                        }, 
                    }}
                >
                    <IconButton 
                        onClick={() => dispatch(setIsCartOpen({}))}
                        sx={{color: "black"}}
                    >
                        <ShoppingCartIcon sx={{height:"25px", width: "25px"}} />
                    </IconButton>
                </Badge>

                <IconButton sx={{color: "black"}}>
                    <MenuOutlined sx={{height:"25px", width: "25px"}} />
                </IconButton>

            </Box>

        </Box>
    </Box>
    );
};

export default Navbar;