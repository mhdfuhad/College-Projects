import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const options = ["Remove Friend"];
function MoreIconAction({ id, set, name }) {
  const [openModal, setOpenModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMoreBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenModal(false);
  };

  const handleRemove = () => {
    axios
      .delete(process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/user/friend", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          friendId: id,
          id: localStorage.getItem("id"),
        },
      })
      .then((res) => {
        set((prev) => prev.filter((friend) => friend.id !== id));
        enqueueSnackbar("Friend removed!", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      });
    handleClose();
  };

  const handleOptionsClick = (option) => {
    return (event) => {
      switch (option) {
        case "Remove Friend":
          setOpenModal(true);
          break;
        default:
          break;
      }
    };
  };
  return (
    <>
      <IconButton
        aria-label="delete"
        size="medium"
        sx={{ bgcolor: "#E0DCDC" }}
        onClick={handleMoreBtnClick}
      >
        <MoreVertIcon color="action" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleOptionsClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove '{name}'</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently remove <strong>{name}</strong>{" "}
            from your friends
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "ButtonFace" }}>
          <Button
            onClick={handleClose}
            style={{
              borderColor: "ButtonFace",
              color: "black",
              textTransform: "none",
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemove}
            variant="contained"
            autoFocus
            style={{ backgroundColor: "#3B4146", textTransform: "none" }}
          >
            Remove Friend
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MoreIconAction;
