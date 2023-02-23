import { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import axios from "axios";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Friend from "./Friend/Friend";
import AddFriendModal from "./AddFriendModal";

export default function OnlineFriendsSideBar(props) {
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState([]);
  const [open, setOpen] = useState(false);

  const openChatBox = (friend) => {
    props.setCurrentChat(friend);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFriends([]);
    props.friendsList?.forEach((friend) => {
      axios
        .get(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/user/friend/" +
            friend,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setFriends((prev) => [
            ...prev,
            {
              name: res.data.name,
              username: res.data.username,
              id: friend,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [props.friendsList]);

  useEffect(() => {
    friends.forEach((friend) => {
      if (props.online.map((friend) => friend.userId).includes(friend.id)) {
        friend.online = true;
      } else {
        friend.online = false;
      }
    });
  }, [friends, props.online]);

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
          Friends - {friends.length}
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#22C55E", textTransform: "none" }}
            onClick={() => setOpen(true)}
          >
            Add Friend
          </Button>
          <AddFriendModal
            open={open}
            onClose={handleClose}
            friend={setFriends}
          />
        </div>
      </Stack>
      <Divider variant="middle" sx={{ color: "gray", mb: 2, mt: 2 }} />
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: "none",
          boxShadow: "0",
        }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Find your friend..."
          inputProps={{ "aria-label": "search ..." }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div
        className="onlineFriendsContainer"
        style={{ height: "80vh", overflowY: "auto" }}
      >
        {friends
          .filter((friend) => friend.name.toLowerCase().includes(query))
          .map((friend, key) => (
            <div key={key}>
              <Friend
                friend={friend}
                openChatBox={openChatBox}
                set={setFriends}
              />
              <Divider variant="middle" sx={{ color: "gray" }} />
            </div>
          ))}
      </div>
    </Box>
  );
}
