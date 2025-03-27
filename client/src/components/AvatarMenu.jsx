import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";

import { deepOrange } from '@mui/material/colors';


const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen}>
      <Avatar sx={{ bgcolor: deepOrange[500], width: 40, height: 40 }}>N</Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>Welcome, User!</Typography>
        <Divider />
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
