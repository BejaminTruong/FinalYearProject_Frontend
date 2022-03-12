import { Stack, Item } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ServerAvatar } from "./index";
import Cookies from "universal-cookie";
import { Logout } from "@mui/icons-material";
const cookies = new Cookies();
const ServerSidebar = () => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("email");
    cookies.remove("dateOfBirth");
    cookies.remove("hashedPassword");
    window.location.reload();
  };
  return (
    <Box className="server-sidebar">
      <Stack
        sx={{
          bgcolor: "primary.dark",
          height: "100%",
          pl: "5px",
          pr: "5px",
        }}
        spacing={1}
      >
        <ServerAvatar />
        <ServerAvatar />
        <ServerAvatar />
        <Box
          sx={{
            width: "70px",
            height: "70px",
            bgcolor: "primary.gray",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ":hover": {
              bgcolor: "button.main",
            },
          }}
          onClick={logout}
        >
          <Logout sx={{ fontSize: "30px", color: "white" }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default ServerSidebar;
