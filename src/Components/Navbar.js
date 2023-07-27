import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import insta from "../Assets/Instagram-name-logo-clipart-PNG.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import { Avatar } from "@mui/material";

export default function Navbar({ userData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { logOut } = React.useContext(AuthContext);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handelprofile = () => {
    navigate(`/profile/${userData.userId}`);
  };

  const handlelogout = async () => {
    await logOut();
    navigate("/login");
  };

  const handleBannerClick = () => {
    navigate("/");
  };

  const handleExplore = () => {
    let win = window.open("https://www.youtube.com/@LearnwithFz", "_blank");

    win.focus();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handelprofile}>
        <AccountCircleIcon /> &nbsp;&nbsp;Profile
      </MenuItem>
      <MenuItem onClick={handlelogout}>
        <ExitToAppIcon />
        &nbsp;&nbsp;Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handelprofile}>
        <AccountCircleIcon /> &nbsp;&nbsp;Profile
      </MenuItem>
      <MenuItem onClick={handlelogout}>
        <ExitToAppIcon />
        &nbsp;&nbsp;Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 ,height:"11vh"}}>
      <AppBar position="static" sx={{ backgroundColor: "white",height:"11vh" }}>
        <Toolbar>
          <div className="">
            <img
              src={insta}
              style={{width:"150px",marginLeft:{lg:"40%"}}}
              alt="instgram"
              onClick={handleBannerClick}
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                color: "black",
                alignItems: "center",
                marginRight: "2rem",
              },
            }}
          >
            <HomeIcon
              onClick={handleBannerClick}
              sx={{ marginRight: "1.5rem",cursor:"pointer" }}
            />
            <ExploreIcon
              onClick={handleExplore}
              sx={{ marginRight: "1rem",cursor:"pointer" }}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <Avatar src={userData && userData.profileUrl} sx={{height:"1.5rem",width:"1.5rem"}} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="black"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
