import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { CardHeader, Stack, Typography } from "@mui/material";
import "../EntertainmentPage/EntertainmentPage.css";
import Button from "@mui/material/Button";
import MovieCardActions from "./MovieCardActions";
import MovieCardContent from "./MovieCardContent";
import { useNavigate } from "react-router-dom";

export default function EntertainmentCard({
  id,
  originalTitle,
  year,
  age,
  overview,
  imdbRating,
  posterPath,
  runtime,
  episodeRuntimes,
  genres,
  movieGenres,
  tvGenres,
  favorite,
  watchList,
  streamingInfo,
}) {
  const navigate = useNavigate();
  const [genreNames, setGenreNames] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [sRuntime, setRuntime] = React.useState(0);

  React.useEffect(() => {
    if (runtime) {
      setRuntime(runtime);
    } else if (episodeRuntimes) {
      setRuntime(episodeRuntimes[0]);
    }

    var genreNamesTemp = [];
    if (runtime)
      movieGenres?.forEach((genre) => {
        if (genres.includes(genre.id)) {
          genreNamesTemp.push(genre.name);
        }
      });
    else
      tvGenres?.forEach((genre) => {
        if (genres.includes(genre.id)) {
          genreNamesTemp.push(genre.name);
        }
      });

    setGenreNames(genreNamesTemp);
    if (streamingInfo) setServices(Object.getOwnPropertyNames(streamingInfo));
  }, []);

  const handleClick = () => {
    navigate(`/entertainment/details/${id}`, {
      state: { mvt: runtime ? true : false, gN: genreNames },
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        margin: "1rem 1rem 1rem 0",
        height: "450px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader
          sx={{ fontFamily: "Roboto sans-serif", cursor: "pointer" }}
          title={originalTitle}
          onClick={handleClick}
          action={
            <IconButton aria-label="settings">
              <StarOutlinedIcon sx={{ color: "#22C55E" }} />
              <span>{imdbRating / 10}/10</span>
            </IconButton>
          }
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <>
          <CardMedia
            component="img"
            sx={{
              maxWidth: 175,
              maxHeight: 200,
              cursor: "pointer",
            }}
            image={"https://image.tmdb.org/t/p/original" + posterPath}
            alt="Movie image"
            style={{ margin: "0 1rem 1rem 1rem", borderRadius: "1rem" }}
            onClick={handleClick}
          />
        </>

        <CardContent sx={{ padding: "0" }}>
          <MovieCardContent
            dateRelease={year}
            genre={genreNames.map((genre) => genre).join(", ")}
            ageRating={age}
            description={overview}
            runtime={sRuntime}
          />
          <Stack
            sx={{ pt: 1, pr: 5 }}
            direction="row"
            spacing={4}
            justifyContent="flex-end"
          >
            <MovieCardActions
              content={{
                id,
                originalTitle,
                year,
                age,
                overview,
                runtime: sRuntime,
                imdbRating,
                posterPath,
                genres,
                favorite,
                watchList,
                streamingInfo,
                mvt: runtime ? true : false,
              }}
            />
          </Stack>
        </CardContent>
      </Box>
      {services.length > 0 ? (
        <Typography sx={{ mx: 2 }} variant="body1" color="textSecondary">
          Platforms available on:
        </Typography>
      ) : null}
      <CardActions sx={{ mx: 2 }}>
        {services.map((service) => (
          <Button
            key={service}
            sx={{
              backgroundColor: "#22C55E",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#22C55E",
                cursor: "default",
                boxShadow: "none",
              },
            }}
            size="large"
            variant="contained"
          >
            {service}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}
