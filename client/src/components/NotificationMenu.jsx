import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const notifications = [
    "New user registered",
    "Project deadline approaching",
    "System update available",
  ];

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon  sx={{width: 30, height: 30, mb:-0.5}} />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {notifications.length === 0 ? (
          <MenuItem>No new notifications</MenuItem>
        ) : (
          notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {notification}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
