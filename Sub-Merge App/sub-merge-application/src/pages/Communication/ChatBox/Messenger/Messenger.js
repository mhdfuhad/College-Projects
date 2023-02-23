import { useState, useEffect, useRef, useContext } from "react";
import { UserDataContext } from "../../../../context/userDataContext";
import { getFriendNames } from "../../utils";
import axios from "axios";

// Components & Styling
import { styled } from "@mui/material/styles";
import {
  Stack,
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { Videocam, LocalPhone, Error } from "@mui/icons-material";
import Message from "../Message/Message";
import MessengerDetails from "../MessengerDetails/MessengerDetails";
import CallWindow from "../CallWindow/CallWindow";
import GroupCalling from "../GroupCalling/GroupCalling";
import "./Messenger.css";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  width: 10,
  height: 30,
  textTransform: "none",
  backgroundColor: "white",
  marginRight: "1vw",
  color: "white",
  borderRadius: "10px",
  ":hover": {
    backgroundColor: "#22C55E",
    color: "black",
  },
});

export default function Messenger({ user, socket, friendsList }) {
  const { userData } = useContext(UserDataContext);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [groupMemberNames, setGroupMemberNames] = useState([]);
  const [display, setDisplay] = useState(false);
  const scrollRef = useRef();

  // Calling variables
  const [open, setOpen] = useState(false); // for opening the call window
  const [groupOpen, setGroupOpen] = useState(false); // for opening the group window
  const [call, setCall] = useState({
    isReceivedCall: false,
  });
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [callRinging, setCallRinging] = useState(false);
  const [callIgnored, setCallIgnored] = useState(false);
  const [video, setVideo] = useState(false);

  /*  {
    id: group._id,
    group: true,
    name: group.conversationName,
    host: group.host,
    members: group.participants,
  } */

  // Socket listener setup once
  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-msg", (data) => {
        const res = data.split(",");
        setIncomingMessage({ sender: res[0], message: res[1] });
      });

      socket.current.on("call-ended", () => {
        setOpen(false);
        window.location.reload();
      });

      socket.current.on("call-user", ({ from, name: callerName, isVideo }) => {
        setCall({ isReceivedCall: true, name: callerName, from });
        setVideo(isVideo);
      });

      socket.current.on("call-rejected", () => {
        setCallRinging(false);
        setCallRejected(true);

        setTimeout(() => {
          setCallRejected(false);
        }, 3000);
      });

      socket.current.on("call-accepted", () => {
        setCallRinging(false);
        setCallAccepted(true);
        setOpen(true);
      });
    }
  }, []);

  const VoiceCall = () => {
    if (user.group) {
      setGroupOpen(true);
    } else {
      socket.current.emit("call-user", {
        to: user.id,
        from: localStorage.getItem("id"),
        name: userData.firstName + " " + userData.lastName,
        isVideo: false,
      });

      setCallRinging(true);
    }

    setVideo(false);
  };

  const VideoCall = () => {
    if (user.group) {
      setGroupOpen(true);
    } else {
      socket.current.emit("call-user", {
        to: user.id,
        from: localStorage.getItem("id"),
        name: userData.firstName + " " + userData.lastName,
        isVideo: true,
      });

      setCallRinging(true);
    }

    setVideo(true);
  };

  const answerCall = () => {
    setCallAccepted(true);
    setOpen(true);
    socket.current.emit("answer-call", {
      to: call.from,
    });
  };

  const leaveCall = () => {
    if (user.group) {
      setGroupOpen(false);
    } else {
      socket.current.emit("end-call", {
        to: user.id,
      });

      setOpen(false);
    }
    window.location.reload();
  };

  const rejectCall = () => {
    socket.current.emit("reject-call", {
      to: user.id,
    });

    setCall({ isReceivedCall: false });
  };

  // Messaging functionality
  useEffect(() => {
    setGroupMemberNames([]);
    setDisplay(false);
    if (!user.group) {
      axios
        .get(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/communication/",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            params: {
              sender: localStorage.getItem("id"),
              recipient: user.id,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            setGroupMemberNames(getFriendNames(res.data.participants));
            setConversation(res.data._id);

            axios
              .get(
                process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
                  "api/communication/messages/" +
                  res.data._id,
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then((resp) => {
                setMessages(resp.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          if (err.response.data.message === "Conversation not found") {
            axios
              .post(
                process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
                  "api/communication/",
                {
                  sender: localStorage.getItem("id"),
                  recipient: user.id,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                setGroupMemberNames(getFriendNames(res.data.participants));
                setConversation(res.data._id);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log(err);
          }
        });
    } else {
      setConversation(user.id);
      setGroupMemberNames(getFriendNames(user.members));

      socket.current.emit("join-group", {
        groupId: user.id,
      });
      axios
        .get(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/communication/messages/" +
            user.id,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      socket.current.emit("leave-group", {
        groupId: user.id,
      });
      setMessages([]);
    };
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.length > 0) {
      const message = {
        sender: localStorage.getItem("id"),
        message: newMessage,
        conversationId: conversation,
      };

      axios
        .post(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/communication/message",
          message,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setMessages([...messages, res.data]);

          socket.current.emit("send-msg", {
            to: user.group ? "gr" + user.id : user.id,
            from: localStorage.getItem("id"),
            message: newMessage,
          });

          setNewMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    incomingMessage && setMessages([...messages, incomingMessage]);
  }, [incomingMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [messages, display]);

  return (
    <>
      <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="navChatBox">
              <Stack direction="row" justifyContent="space-between">
                <p className="userName">{user.name}</p>
                <div>
                  <BootstrapButton onClick={VideoCall} sx={{ margin: 0 }}>
                    <Videocam fontSize="large" color="action" />
                  </BootstrapButton>
                  {open && (
                    <CallWindow
                      onClose={leaveCall}
                      userInfo={user}
                      video={video}
                      host={call.from || localStorage.getItem("id")}
                    />
                  )}
                  {groupOpen && (
                    <GroupCalling
                      host={user.id}
                      onClose={leaveCall}
                      video={video}
                      userInfo={user}
                    />
                  )}

                  <BootstrapButton onClick={VoiceCall} sx={{ margin: 0 }}>
                    <LocalPhone fontSize="large" color="action" />
                  </BootstrapButton>
                  <BootstrapButton
                    onClick={() => setDisplay(!display)}
                    sx={{ margin: 0 }}
                  >
                    <Error fontSize="large" color="action" />
                  </BootstrapButton>
                </div>
              </Stack>
            </div>
            {display ? (
              <>
                <MessengerDetails
                  users={groupMemberNames}
                  curr={user}
                  setGr={setGroupMemberNames}
                  frList={friendsList}
                />
              </>
            ) : (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div ref={scrollRef} key={index}>
                      <Message {...m} />
                    </div>
                  ))}
                </div>

                <form
                  className="chatBoxBottom"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  <input
                    className="chatMessageInput"
                    placeholder="Enter your message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={call.isReceivedCall && !callAccepted}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Call from {call.name}</DialogTitle>
        <DialogActions sx={{ bgcolor: "ButtonFace" }}>
          <Button
            onClick={rejectCall}
            style={{
              borderColor: "ButtonFace",
              color: "black",
              textTransform: "none",
            }}
            variant="outlined"
          >
            Reject Call
          </Button>
          <Button
            onClick={answerCall}
            variant="contained"
            autoFocus
            style={{ backgroundColor: "#3B4146", textTransform: "none" }}
          >
            Accept Call
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={callIgnored}
        onClose={() => setCallIgnored(false)}
        aria-labelledby="alert-dialog-title-ignored"
      >
        <DialogTitle id="alert-dialog-title-ignored">
          Call not picked up
        </DialogTitle>
      </Dialog>

      {/* Dialog to show when ringing */}
      <Dialog open={callRinging} aria-labelledby="alert-dialog-title-ring">
        <DialogTitle id="alert-dialog-title-ring">
          Ringing {user.name}
        </DialogTitle>
      </Dialog>

      {/* Dialog to show when call is rejected */}
      <Dialog
        open={callRejected}
        aria-labelledby="alert-dialog-title-rej"
        onClose={() => setCallRejected(false)}
      >
        <DialogTitle id="alert-dialog-title-rej">Call Rejected</DialogTitle>
      </Dialog>
    </>
  );
}
