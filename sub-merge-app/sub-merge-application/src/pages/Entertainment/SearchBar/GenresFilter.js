// React Library
import { useEffect, useState } from "react";

// Material UI
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

export default function GenresFilter({ movie, genre }) {
  const [genresList, setGenresList] = useState([]);
  const [checkedGenres, setCheckedGenres] = useState([]);

  const handleOnChange = (position) => {
    const updatedCheckedGenres = checkedGenres.map((genre, index) =>
      index === position ? !genre : genre
    );

    setCheckedGenres(updatedCheckedGenres);

    genre.setGenresState(
      genresList
        .filter((genre, index) => updatedCheckedGenres[index])
        .map((genre) => genre.id)
    );
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/entertainment/genres",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (movie) {
          setGenresList(response.data.movieGenres);
          setCheckedGenres(
            new Array(response.data.movieGenres.length).fill(false)
          );
        } else {
          setGenresList(response.data.tvGenres);
          setCheckedGenres(
            new Array(response.data.tvGenres.length).fill(false)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movie]);

  return (
    <Box
      sx={{
        pb: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Genres
      </Typography>
      <Grid container columns={12}>
        {genresList.map((genre, idx) => (
          <Grid item key={idx} xs={4} lg={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleOnChange(idx)}
                    value={genre.id}
                    name={genre.name}
                    checked={checkedGenres[idx]}
                  />
                }
                label={genre.name}
              />
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
