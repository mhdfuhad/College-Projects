import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBarAccountSettings({ userFirstName, logout }) {
  const navigate = useNavigate();
  const settings = ["My Account", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const handleOnClick = (index) => {
    return (event) => {
      switch (index) {
        case 0:
          navigate("/profile/userprofile");
          handleCloseUserMenu();
          break;
        case 1:
          logout();
          break;
        default:
      }
    };
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
          <AccountCircleIcon fontSize="large" sx={{ color: "white", mr: 1 }} />
          <Typography variant="h6" noWrap sx={{ color: "white" }}>
            {userFirstName}
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={handleOnClick(index)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
