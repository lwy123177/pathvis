import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AboutDialog from "./AboutDialog";
import { useState, useContext } from "react";
import { GridContext } from "../store/GridContext";

const pages = ["AStar", "Bfs", "Dfs"];
const settings = ["About", "Source Code"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<
    (EventTarget & Element) | null
  >(null);
  const [anchorElUser, setAnchorElUser] = React.useState<
    (EventTarget & Element) | null
  >(null);
  const [openAboutDialog, setOpenAboutDialog] = useState(false);
  const gridContext = useContext(GridContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.SyntheticEvent) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.SyntheticEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickNavLink = (page: string) => {
    if (gridContext.state !== "Drawing") {
      gridContext.setHighlightLines([]);
      navigate(page);
    }
    handleCloseNavMenu();
  };

  const handleClickSetting = (setting: string) => {
    if (setting === "About") {
      setOpenAboutDialog(true);
    } else if (setting === "Source Code") {
      const url = "https://github.com/lwy123177/lwy123177.github.io";
      const result = window.open(url, "_blank");
      if (result) {
        result.focus();
      }
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <AboutDialog open={openAboutDialog} setOpen={setOpenAboutDialog} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            onClick={() => handleClickNavLink("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PathVisual
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Tooltip
                  key={"tool_" + page}
                  title={
                    gridContext.state === "Drawing"
                      ? "Cannot change tab while drawing"
                      : page
                  }
                >
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        handleClickNavLink(page);
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                </Tooltip>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            onClick={() => handleClickNavLink("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PathVisual
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Tooltip
                key={"tool_" + page}
                title={
                  gridContext.state === "Drawing"
                    ? "Cannot change tab while drawing"
                    : page
                }
              >
                <Button
                  key={"bnt_" + page}
                  onClick={() => handleClickNavLink(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Tooltip>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon style={{ color: "white" }} />
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleClickSetting(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
