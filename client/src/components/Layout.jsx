// src/components/Layout.jsx
import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // ✅ Add Outlet for pages

const drawerWidth = 240;

const Layout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant='persistent'
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: '#F7FAFC', // Custom background color
          },
        }}
      >
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
      </Drawer>

      {/* Main Content */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: open ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s",
        }}
      >
        <Toolbar /> {/* Keeps content below AppBar */}
        
        {/* This will render the current page */}
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default Layout;
