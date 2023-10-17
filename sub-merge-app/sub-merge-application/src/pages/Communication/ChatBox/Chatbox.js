import React from "react";
import "./Chatbox.css";
import { Box } from "@mui/material";
import Messenger from "./Messenger/Messenger";

function Chatbox({ currentChat, socket, friendsList }) {
  return (
    <Box height="90vh">
      {currentChat ? (
        <>
          <Messenger
            user={currentChat}
            socket={socket}
            friendsList={friendsList}
          />
        </>
      ) : (
        <Box height="90vh" sx={{ position: "relative" }}>
          <span className="noConversationText">
            Click on the conversation you'd like to view
          </span>
        </Box>
      )}
    </Box>
  );
}

export default Chatbox;
