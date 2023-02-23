import Tooltip from "@mui/material/Tooltip";
import StarsIcon from "@mui/icons-material/Stars";
import RecommendIcon from "@mui/icons-material/Recommend";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { Fragment } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function MovieCardActions({ content }) {
  const { enqueueSnackbar } = useSnackbar();

  const addToListHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + `api/entertainment/add`,
        {
          userID: localStorage.getItem("id"),
          ...content,
          watchList: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        enqueueSnackbar("Added to watch list", {
          variant: "success",
        });
      })
      .catch((err) => {
        if (err.response.data.message === "Already in list")
          enqueueSnackbar("Already in watch list", {
            variant: "error",
          });
        else
          enqueueSnackbar("Error adding to watch list", {
            variant: "error",
          });
      });
  };

  const addFavoriteHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + `api/entertainment/add`,
        {
          userID: localStorage.getItem("id"),
          ...content,
          favorite: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            fav: true,
          },
        }
      )
      .then((res) => {
        enqueueSnackbar("Added to favorites", {
          variant: "success",
        });
      })
      .catch((err) => {
        if (err.response.data.message === "Already in list")
          enqueueSnackbar("Already in favorites", {
            variant: "error",
          });
        else
          enqueueSnackbar("Error adding to favorites", {
            variant: "error",
          });
      });
  };

  const removeBtnHandler = (event) => {
    event.preventDefault();
    axios
      .delete(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          `api/entertainment/delete/${content.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            id: localStorage.getItem("id"),
            fav: content.favorite,
          },
        }
      )
      .then((res) => {
        window.location.reload();
        enqueueSnackbar("Removed from list", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error removing from list", {
          variant: "error",
        });
      });
  };

  return (
    <Fragment>
      <IconButton sx={{ color: "#22C55E" }} onClick={addToListHandler}>
        <Tooltip title="Add To List">
          <StarsIcon fontSize="large" />
        </Tooltip>
      </IconButton>
      <IconButton sx={{ color: "#22C55E" }} onClick={addFavoriteHandler}>
        <Tooltip title="Add To Favorite">
          <RecommendIcon fontSize="large" />
        </Tooltip>
      </IconButton>
      {(content.favorite || content.watchList) && (
        <IconButton sx={{ color: "#22C55E" }} onClick={removeBtnHandler}>
          <Tooltip title="Remove From Favorite">
            <DoDisturbIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      )}
    </Fragment>
  );
}
