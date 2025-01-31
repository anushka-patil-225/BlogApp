import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (location.pathname === "/blogs") {
      setValue(0); // Home tab
    } else if (location.pathname === "/myBlogs") {
      setValue(1); // My Blogs tab
    } else if (location.pathname === "/blogs/add") {
      setValue(2); // New Blog tab
    }
  }, [location.pathname]);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: `${isDark ? darkTheme.bg : lightTheme.bg}`,
        width: "100%",
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: "bold",
            letterSpacing: 2,
            textShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
            color: "cyan",
          }}
        >
          TechNova
        </Typography>

        {isLoggedIn && (
          <Box display="flex" justifyContent="center" flexGrow={1}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="Home"
                sx={{
                  fontWeight: "bold",
                  "&:hover": { color: "#00e6e6" },
                }}
              />
              <Tab
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
                sx={{
                  fontWeight: "bold",
                  "&:hover": { color: "#00e6e6" },
                }}
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/add"
                label="New Blog"
                sx={{
                  fontWeight: "bold",
                  "&:hover": { color: "#00e6e6" },
                }}
              />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn ? (
            <>
              <Button
                LinkComponent={Link}
                to="login/"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  backgroundColor: "rgb(108, 208, 215)",
                  borderRadius: 10,
                  paddingLeft: 2,
                  paddingRight: 2,
                  "&:hover": {
                    backgroundColor: "rgb(96, 157, 161)",
                  },
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  backgroundColor: "rgb(108, 208, 215)",
                  borderRadius: 10,
                  "&:hover": {
                    backgroundColor: "rgb(96, 157, 161)",
                  },
                }}
              >
                Logout
              </Button>
              <Avatar sx={{ bgcolor: "rgb(108, 208, 215)" }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography
                sx={{ fontWeight: "bold", color: "white" }}
              ></Typography>
            </Box>
          )}

          <div
            onClick={() => dispatch(setDarkmode(!isDark))}
            style={{ padding: "10px 0", cursor: "pointer" }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
