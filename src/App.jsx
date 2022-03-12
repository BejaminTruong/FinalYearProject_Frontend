import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import "stream-chat-react/dist/css/index.css";
import "./App.css";
const apiKey = "szvg39r7shkf";
const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();
const authToken = cookies.get("token");
if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      email: cookies.get("email"),
      dateOfBirth: cookies.get("dateOfBirth"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}
const App = () => {
  if (!authToken) return <Auth />;
  return (
    <div className="content_wrapper">
      <Chat client={client}>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
