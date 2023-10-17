// React Library
import { useRef, useState, useEffect } from "react";
import axios from "axios";

// Material UI, Bootstrap
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSnackbar } from "notistack";

function CreateGroupModal({ open, onClose, friendsList, group }) {
  const { enqueueSnackbar } = useSnackbar();
  const groupNameInput = useRef(null);
  const [friends, setFriends] = useState([]);
  const [checkedFriends, setCheckedFriends] = useState(
    new Array(friendsList?.length).fill(false)
  );

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

    if (groupNameInput.current.value === "" || selectedFriends.length === 0) {
      enqueueSnackbar(
        "Please enter a group name and select at least one friend",
        {
          variant: "error",
        }
      );
    } else {
      selectedFriends.push({
        id: localStorage.getItem("id"),
      });

      axios
        .post(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/communication/group",
          {
            groupName: groupNameInput.current.value,
            members: selectedFriends.map((friend) => friend.id),
            host: localStorage.getItem("id"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          group.setGroups([...group.groups, res.data]);
          setCheckedFriends(new Array(friendsList?.length).fill(false));
          onClose();
          enqueueSnackbar("Group created successfully", {
            variant: "success",
          });
        });
    }
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
    setCheckedFriends(new Array(friendsList?.length).fill(false));
  }, [friendsList]);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 500 } }}
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Create New Group</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="Enter group name"
          fullWidth
          variant="standard"
          inputRef={groupNameInput}
        />
        <DialogContentText marginTop="20px">
          Select friends you want to add to your group
        </DialogContentText>

        {friends.map((friend, idx) => (
          <FormGroup key={idx}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleOnChange(idx)}
                  value={friend.name}
                  name={friend.name}
                  checked={checkedFriends[idx]}
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
        >
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateGroupModal;
