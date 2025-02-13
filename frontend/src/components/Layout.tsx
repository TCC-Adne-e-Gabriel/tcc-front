import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, TextField, InputAdornment } from "@mui/material";
import { ThemeContext } from '../context/ThemeContext';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}
  
const Layout: React.FC<LayoutProps> = ({ children }) => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        return null;
    }
    
    const { toggleTheme, mode } = themeContext;

    return (
        <Box>
        <AppBar position="static" sx={{ backgroundColor: "primary" }}>
            <Toolbar>
            <Link href="/">
                <Button sx={{ color: "white" }} aria-label="Ir para carrinho">
                    <Typography variant="h6">Ettis</Typography>
                </Button>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            <TextField
                placeholder="O que você está procurando?"
                variant="outlined"
                size="small"
                sx={{ 
                    width: 300,
                    color: "black",
                    backgroundColor: "white", 
                    borderRadius: 1, 
                    mr: 2,
                    '& .MuiInputBase-input::placeholder': {
                        color: 'gray',
                        opacity: 1,
                    },
                    '& .MuiInputBase-input': {
                        color: 'black',
                        opacity: 1,
                    },
                }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: "black" }}/>
                    </InputAdornment>
                ),
                }}
            />

            <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Link href="/">
                <IconButton sx={{ color: "white" }} aria-label="Ir para favoritos">
                    <FavoriteBorderIcon />
                </IconButton>
            </Link>
            <Link href="/">
                <IconButton sx={{ color: "white" }} aria-label="Ir para carrinho">
                    <ShoppingCartIcon />
                </IconButton>
            </Link>
            <Link href="/login">
                <IconButton sx={{ color: "white" }} aria-label="Ir para login">
                    <AccountCircleIcon />
                </IconButton>
            </Link>
            </Toolbar>
        </AppBar>
        <div>{children}</div>
        </Box>
    );
};

export default Layout;