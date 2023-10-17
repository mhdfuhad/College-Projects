// React Library
import { useRef } from "react";
import axios from "axios";

// Material UI, Bootstrap
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";

function AddFriendModal({ open, onClose, friend }) {
  const inputField = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddBtn = (e) => {
    axios
      .put(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/user/friend",
        {
          friendEmail: inputField.current.value,
          id: localStorage.getItem("id"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        enqueueSnackbar("Friend added!", { variant: "success" });
        friend((prev) => [
          ...prev,
          {
            id: res.data.userData._id,
            name: res.data.userData.name,
            online: false,
            username: res.data.userData.username,
          },
        ]);
      })
      .catch((err) => {
        if (err.response.data.message === "User already friends") {
          enqueueSnackbar("User already friends", {
            variant: "info",
          });
        } else if (err.response.data.message === "User does not exist") {
          enqueueSnackbar("User does not exist", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Error adding friend", {
            variant: "error",
          });
        }
      });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new friend, please enter the email address of the person you
          wish to add.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          inputRef={inputField}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          style={{
            borderColor: "ButtonFace",
            color: "black",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#3B4146", textTransform: "none" }}
          onClick={handleAddBtn}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddFriendModal;
