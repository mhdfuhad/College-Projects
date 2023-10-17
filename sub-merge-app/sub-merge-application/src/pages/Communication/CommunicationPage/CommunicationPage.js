import { useEffect, useState, useContext, useRef } from "react";
import { UserDataContext } from "../../../context/userDataContext";
import { io } from "socket.io-client";
import axios from "axios";

// Components
import OnlineFriendsSideBar from "../OnlineFriendsSideBar/OnlineFriendsSideBar";
import JoinedGroupsSideBar from "../JoinedGroupSideBar/JoinedGroupsSideBar";
import Chatbox from "../ChatBox/Chatbox";
import { useSnackbar } from "notistack";
// Styling components
import { Grid, Box } from "@mui/material";

function CommunicationPage() {
  const [userId] = useState(localStorage.getItem("id"));
  const { userData } = useContext(UserDataContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [friendsList, setFriendList] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SUBMERGE_API_ENDPOINT);
    socket.current.emit("add-user", userId);

    socket.current.on("users-list", (u) => {
      setOnlineFriends(u);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    setFriendList(userData?.friends);
  }, [userData]);

  useEffect(() => {
    socket.current.on("receive-msg", (data) => {
      const res = data.split(",");
      axios
        .get(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/user/friend/" +
            res[0],
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          enqueueSnackbar("Message from " + res.data.name, {
            variant: "info",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 2,
        pr: 1,
        pl: 1,
        overflow: "hidden",
      }}
    >
      <Grid container spacing={3}>
        <Grid item lg={2.5} md={3.5} sm={12}>
          <OnlineFriendsSideBar
            friendsList={friendsList}
            setCurrentChat={setCurrentChat}
            online={onlineFriends}
          />
        </Grid>
        <Grid item lg={7} md={5} sm={12}>
          <Chatbox
            currentChat={currentChat}
            socket={socket}
            friendsList={friendsList}
          />
        </Grid>
        <Grid item lg={2.5} md={3.5} sm={12}>
          <JoinedGroupsSideBar
            friendsList={friendsList}
            setCurrentChat={setCurrentChat}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CommunicationPage;
