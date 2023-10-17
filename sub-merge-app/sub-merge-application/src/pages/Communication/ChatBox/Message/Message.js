import "./Message.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { format } from "timeago.js";
import { useEffect, useState } from "react";

export default function Message({ sender, message, createdAt }) {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/user/friend/" +
          sender,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setFriend(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sender]);

  return (
    <>
      <div
        className={
          sender === localStorage.getItem("id") ? "message own" : "message"
        }
      >
        <p className="senderName">{friend}</p>
        <div className="messageTop">
          <AccountCircleIcon className="staticAva" fontSize="large" />
          <p className="messageText">{message}</p>
        </div>

        <div className="messageBottom">{format(createdAt)}</div>
      </div>
    </>
  );
}
