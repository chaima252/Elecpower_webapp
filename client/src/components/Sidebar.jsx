import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import CabinetIcon from "@mui/icons-material/Archive";
import { Link } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Projects", icon: <WorkIcon />, path: "/projects" },
  { text: "Employees", icon: <PeopleIcon />, path: "/employees" },
  { text: "Reports", icon: <BarChartIcon />, path: "/reports" },
  { text: "Materials", icon: <InventoryIcon />, path: "/materials" },
  { text: "Cabinets", icon: <CabinetIcon />, path: "/cabinets" },
];

const Sidebar = () => {
  return (
    <>
      <Toolbar />
      <Divider />
      <List
        sx={{
          mt: 5,
          height: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            sx={{
              "&:hover": { backgroundColor: "#EAF3FD", color: "#3385F0" },
            }}
            key={item.text}
            component={Link}
            to={item.path}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
