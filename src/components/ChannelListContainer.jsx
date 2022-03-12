import { Box } from "@mui/material";
import React from "react";
import { ServerSidebar } from "./index";

const ChannelListContent = () => {
  return (
    <div className="channel-list_content">
      <p>hdflas</p>
    </div>
  );
};

const ChannelListContainer = () => {
  return (
    <Box
      sx={{ bgcolor: "primary.quiteDark" }}
      className="channel-list_container"
    >
      <ServerSidebar />
      <ChannelListContent />
    </Box>
  );
};

export default ChannelListContainer;
