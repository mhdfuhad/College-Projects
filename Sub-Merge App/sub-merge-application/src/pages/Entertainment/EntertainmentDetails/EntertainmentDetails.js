import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import MovieCardActions from "../EntertainmentCard/MovieCardActions";
import axios from "axios";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  width: 110,
  height: 45,
  textTransform: "none",
  fontSize: 15,
  fontWeight: 15,
  padding: "4px 8px",
  backgroundColor: "#2E8B57",
  color: "white",
  borderRadius: "10px",
  ":hover": {
    backgroundColor: "#22C55E",
    color: "white",
  },
});

const SubButton = styled(Button)({
  boxShadow: "none",
  width: 80,
  height: 45,
  textTransform: "none",
  fontSize: 15,
  fontWeight: 20,
  padding: "6px 12px",
  backgroundColor: "#2E8B57",
  color: "white",
  borderRadius: "10px",
  ":hover": {
    backgroundColor: "#22C55E",
    color: "white",
  },
});

export default function EntertainmentDetails() {
  let { id } = useParams();
  const { state } = useLocation();
  const [contentInfo, setContentInfo] = useState(null);
  const [runtime, setRuntime] = useState(0);
  const [services, setServices] = useState([]);

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours === 0) {
      return rminutes + "m";
    } else if (rminutes === 0) {
      return rhours + `h`;
    } else {
      return rhours + `h ` + rminutes + "m";
    }
  }

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          `api/entertainment/${id}/${!state.mvt ? "series" : "movie"}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.data.hasOwnProperty("movie")) {
          setRuntime(res.data.data.movie.runtime);
          setContentInfo(res.data.data.movie);
          setServices(
            Object.entries(res.data.data.movie.streamingInfo).filter((plat) =>
              plat[1].hasOwnProperty("ca")
            )
          );
        } else {
          setRuntime(res.data.data.series.episodeRuntimes[0]);
          setContentInfo(res.data.data.series);
          setServices(
            Object.entries(res.data.data.series.streamingInfo).filter((plat) =>
              plat[1].hasOwnProperty("ca")
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, state.mvt]);

  return contentInfo ? (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="100">
        <Box
          sx={{
            bgcolor: "#F5F5F5",
            height: "70vh",
            marginTop: "7vh",
            marginLeft: "5vw",
            marginRight: "5vw",
          }}
        >
          <Grid container>
            <Grid item xs>
              <img
                alt="poster"
                style={{
                  borderRadius: 10,
                  marginTop: "2vh",
                  marginLeft: "3vh",
                  height: "65vh",
                  width: "24vw",
                }}
                src={
                  "https://image.tmdb.org/t/p/original" + contentInfo.posterPath
                }
              />
            </Grid>
            <Grid item xs>
              <Typography
                variant="h3"
                align="left"
                color="text.primary"
                fontWeight={"bold"}
                marginTop={"8vh"}
                gutterBottom
              >
                {contentInfo.title} ({contentInfo.year})
              </Typography>
              <BootstrapButton>Age {contentInfo.age}+</BootstrapButton>
              <Typography
                display={"inline"}
                variant="h5"
                color="text.secondary"
                marginLeft={"2vh"}
                gutterBottom
              >
                {state.gN.map((genre) => genre).join(", ")}
              </Typography>
              <NoiseControlOffIcon fontSize="medium" sx={{ mb: 1 }} />
              <Typography
                display={"inline"}
                variant="h5"
                color="text.primary"
                gutterBottom
              >
                {timeConvert(runtime)}
              </Typography>

              <Typography
                variant="h5"
                align="left"
                color="text.primary"
                marginTop={"3vh"}
                gutterBottom
              >
                Overview
              </Typography>
              <Typography
                variant="h7"
                align="left"
                marginTop={"1vh"}
                gutterBottom
              >
                {contentInfo.overview}
              </Typography>
              <br />
              <br />
              {contentInfo.tagline !== "" ? (
                <Typography
                  variant="h7"
                  align="left"
                  marginTop={"1vh"}
                  gutterBottom
                >
                  <i>"{contentInfo.tagline}"</i>
                </Typography>
              ) : null}
              {contentInfo.significants.length > 0 ? (
                <>
                  <Typography
                    variant="h5"
                    align="left"
                    color="text.primary"
                    marginTop={"1vh"}
                    gutterBottom
                  >
                    Director
                  </Typography>
                  <Typography
                    variant="h7"
                    align="left"
                    marginTop={"1vh"}
                    gutterBottom
                  >
                    {contentInfo.significants[0]}
                  </Typography>
                </>
              ) : null}
              {services.length > 0 ? (
                <>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    marginTop={"2vh"}
                    gutterBottom
                  >
                    Watch On:
                  </Typography>
                  <Stack sx={{ pt: 1 }} direction="row" spacing={2}>
                    {services.map((service) => (
                      <Button
                        key={service[0]}
                        size="medium"
                        variant="contained"
                        style={{
                          backgroundColor: "#4169E1",
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          window.open(service[1].ca.link, "_blank");
                        }}
                      >
                        {service[0]}
                      </Button>
                    ))}
                  </Stack>
                </>
              ) : null}
            </Grid>

            <Grid item xs>
              <Typography marginTop={"10vh"} marginLeft={"45vh"}>
                <SubButton>
                  {contentInfo.imdbRating / 10} &nbsp; <StarIcon />
                </SubButton>
              </Typography>

              <Stack
                sx={{ pt: 8 }}
                direction="row"
                spacing={3}
                marginLeft={"3vw"}
              >
                <MovieCardActions
                  content={{
                    id: contentInfo.id,
                    originalTitle: contentInfo.originalTitle,
                    year: contentInfo.year,
                    age: contentInfo.age,
                    overview: contentInfo.overview,
                    runtime: runtime,
                    imdbRating: contentInfo.imdbRating,
                    posterPath: contentInfo.posterPath,
                    genres: contentInfo.genres,
                    streamingInfo: contentInfo.streamingInfo,
                    mvt: state.mvt,
                  }}
                />
              </Stack>
              {contentInfo.video !== "" ? (
                <Box
                  sx={{
                    marginTop: "5vh",
                    marginBottom: "2vh",
                    marginLeft: "3vw",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.primary"
                    marginTop={"2vh"}
                    gutterBottom
                  >
                    Watch trailer:
                  </Typography>
                  <iframe
                    title="trailer"
                    width="95%"
                    height="400px"
                    src={"https://www.youtube.com/embed/" + contentInfo.video}
                  ></iframe>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            marginTop: "3vh",
            marginLeft: "5vw",
            marginRight: "3vw",
          }}
        >
          <Typography variant="h4" color="text.primary" gutterBottom>
            Movie Cast:
          </Typography>
          {contentInfo.cast.map((cast) => (
            <Card
              key={cast}
              sx={{
                display: "inline-block",
                borderRadius: "10px",
                backgroundColor: "#F6F6F6",
                mx: 1,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }} style={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    display: "block",
                    justifyContent: "start",
                    alignItems: "baseline",
                  }}
                >
                  <Typography component="h2" variant="h5" color="text.primary">
                    {cast}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
          <br />
        </Box>
      </Container>
    </React.Fragment>
  ) : null;
}
