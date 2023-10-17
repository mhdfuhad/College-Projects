import { Box, Stack, Typography, Avatar, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import "./JoinedGroupsSideBar.css";
import CreateGroupModal from "./CreateGroupModal";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

export default function JoinedGroupsSideBar({ setCurrentChat, friendsList }) {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/communication/group",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            member: localStorage.getItem("id"),
          },
        }
      )
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        p: 1,
        border: "5px solid #ccc",
        borderRadius: "25px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        margin="0 15px 10px 15px"
      >
        <Typography fontSize={20} fontWeight={500} color="#66686C">
          Groups
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#22C55E", textTransform: "none" }}
            onClick={() => setOpen(true)}
          >
            Create new group
          </Button>
          <CreateGroupModal
            open={open}
            onClose={handleClose}
            friendsList={friendsList}
            group={{ setGroups, groups }}
          />
        </div>
      </Stack>
      <Divider variant="middle" sx={{ color: "gray", mb: 2, mt: 2 }} />

      <div
        className="groupChatContainer"
        style={{ height: "90vh", overflowY: "auto", marginTop: "2rem" }}
      >
        {groups.map((group, key) => (
          <div key={key}>
            <Stack
              direction="row"
              alignItems="center"
              style={{
                cursor: "pointer",
                padding: "10px",
                borderRadius: "0.5rem",
                marginBottom: "5px",
                marginRight: "5px",
              }}
              className="conversation"
              spacing={2}
              onClick={() => {
                setCurrentChat({
                  id: group._id,
                  group: true,
                  name: group.conversationName,
                  host: group.host,
                  members: group.participants,
                });
              }}
            >
              <Avatar {...stringAvatar(group.conversationName)} />

              <Typography fontWeight={500} fontSize={18}>
                {group.conversationName}
              </Typography>
            </Stack>
            <Divider variant="middle" sx={{ color: "gray" }} />
          </div>
        ))}
      </div>
    </Box>
  );
}
