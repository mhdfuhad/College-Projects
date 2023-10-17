import { Stack, Typography, Avatar, IconButton } from "@mui/material";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import React from "react";
import MoreIconAction from "./MoreIconAction";
import "./Friend.css";
import { stringAvatar } from "../../utils";

function Friend({ friend, openChatBox, set }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      style={{
        cursor: "pointer",
        padding: "10px",
        borderRadius: "0.5rem",
        marginBottom: "5px",
        marginTop: "5px",
      }}
      className="conversation"
    >
      <Stack direction="row" alignItems="center">
        <div className="chatOnlineImgContainer">
          <Avatar {...stringAvatar(friend.name)} />
          {friend.online ? <div className="chatOnlineBadge"></div> : null}
        </div>

        <Typography fontWeight={500} fontSize={16}>
          {friend.name}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="delete"
          size="medium"
          sx={{ bgcolor: "#E0DCDC" }}
          onClick={() => openChatBox(friend)}
        >
          <ChatBubbleOutlinedIcon color="action" />
        </IconButton>
        <MoreIconAction {...friend} set={set} />
      </Stack>
    </Stack>
  );
}

export default Friend;
