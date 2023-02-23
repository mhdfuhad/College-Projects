import { Modal } from "react-bootstrap";
import { useState } from "react";
import GenresFilter from "./GenresFilter";
import PlatformsFilter from "./PlatformsFilter";
import RatingFilter from "./RatingFilter";
import TvMoviesFilter from "./TvMoviesFilter";
import LanguageFilter from "./LanguageFilter";
import { Button, Stack } from "@mui/material";

export default function SearchFilter(props) {
  const [movie, setMovie] = useState(true);
  const [setGenres, setGenresState] = useState(false);
  const [setPlatforms, setPlatformsState] = useState(false);
  const [setRating, setRatingState] = useState(false);
  const [language, setLanguageState] = useState("");

  const submitBtnHandler = (event) => {
    event.preventDefault();

    props.data.setFilterData({
      movie,
      setGenres,
      setPlatforms,
      language,
      setRating,
    });

    setGenresState(false);
    setPlatformsState(false);
    setRatingState(false);
    setLanguageState("");
    setMovie(true);

    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ alignSelf: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">Filter By</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TvMoviesFilter movie={{ movie, setMovie }} />
        <GenresFilter movie={movie} genre={{ setGenresState }} />
        <PlatformsFilter platform={{ setPlatformsState }} />
        <RatingFilter rating={{ setRatingState }} />
        <LanguageFilter language={{ setLanguageState }} />

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={props.onHide}
            style={{ borderColor: "black", color: "black" }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={submitBtnHandler}
            variant="contained"
            style={{ backgroundColor: "#3b4146" }}
          >
            Submit
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
