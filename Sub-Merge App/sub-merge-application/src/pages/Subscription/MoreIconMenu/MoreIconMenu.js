// React Library
import { useState } from "react";
import { Fragment } from "react";
import axios from "axios";

// Material UI
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "notistack";

// Components
import UpdateSubscription from "../UpdateSubscription/UpdateSubscription";

const options = ["Update", "Remove"];

export default function MoreIconMenu(props) {
  const { enqueueSnackbar } = useSnackbar();
  const handleOptionsClick = (option) => {
    return (event) => {
      switch (option) {
        case "Update":
          setModalShow(true);
          handleClose();
          break;
        case "Remove":
          console.log(props._id);
          axios
            .delete(
              process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
                "api/subscription/delete/" +
                props._id,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
                data: {
                  userID: localStorage.getItem("id"),
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              enqueueSnackbar("Subscription removed successfully", {
                variant: "success",
              });
              window.location.reload();
            })
            .catch((err) => {
              enqueueSnackbar("Error removing subscription", {
                variant: "error",
              });
              console.log(err);
            });

          break;
        default:
          break;
      }
    };
  };
  const [modalShow, setModalShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMoreBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMoreBtnClick}
      >
        <MoreVertIcon />
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
            width: "22ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleOptionsClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <UpdateSubscription
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props._id}
        platform={props.platform}
        tier={props.tier}
        datesubscribed={props.dateSubscribed}
        amount={props.amount}
        recurring={props.recurring}
      />
    </Fragment>
  );
}
