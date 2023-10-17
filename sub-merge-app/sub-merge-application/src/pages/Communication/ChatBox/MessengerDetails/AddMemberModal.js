// React Library
import { useState, useEffect } from "react";
import axios from "axios";

// Material UI, Bootstrap
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function AddMemberModal({ open, onClose, friendsList, group }) {
  const [friends, setFriends] = useState([]);
  const [checkedFriends, setCheckedFriends] = useState([]);

  const handleOnChange = (position) => {
    const updatedCheckedFriends = checkedFriends.map((friend, index) =>
      index === position ? !friend : friend
    );

    setCheckedFriends(updatedCheckedFriends);
  };

  const handleCreateGroupBtn = (event) => {
    const selectedFriends = friends.filter(
      (friend, idx) => checkedFriends[idx] === true
    );

    axios
      .put(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/communication/group/member/" +
          group.id,
        {
          participants: selectedFriends.map((friend) => friend.id),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setCheckedFriends(new Array(friendsList?.length).fill(false));
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setFriends([]);

    friendsList?.forEach((friend) => {
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
          if (!group.members.includes(friend)) {
            setFriends((prev) => [
              ...prev,
              {
                name: res.data.name,
                username: res.data.username,
                id: friend,
              },
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    setCheckedFriends(new Array(friendsList?.length).fill(false));
  }, [friendsList, group]);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 500 } }}
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add member to {group.name}</DialogTitle>
      <DialogContent dividers>
        {friends.length > 0 ? (
          <DialogContentText>
            Select friends you want to add to your group
          </DialogContentText>
        ) : (
          <DialogContentText>All friends in current group</DialogContentText>
        )}

        {friends.map((friend, idx) => (
          <FormGroup key={idx}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleOnChange(idx)}
                  value={friend.name}
                  name={friend.name}
                />
              }
              label={friend.name}
            />
          </FormGroup>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          style={{
            borderColor: "ButtonFace",
            color: "black",
            textTransform: "none",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#3B4146", textTransform: "none" }}
          onClick={handleCreateGroupBtn}
          disabled={friends.length === 0}
        >
          Add Member(s) to Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMemberModal;
