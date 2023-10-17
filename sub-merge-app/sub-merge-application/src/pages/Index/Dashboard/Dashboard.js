// React Library
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { stringAvatar } from "../../Communication/utils";

// Material UI
import { Button, Grid, Stack, Typography, Avatar } from "@mui/material";
import { format, parseISO, add } from "date-fns";
import Box from "@mui/material/Box";

import SubscriptionCard from "../../Subscription/SubscriptionCard/SubscriptionCard";
import EntertainmentCard from "../../Entertainment/EntertainmentCard/EntertainmentCard";

export default function Dashboard() {
  const [Subscriptions, setSubscriptions] = useState([]);
  const [genres, setGenres] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/subscription/all/" +
          localStorage.getItem("id"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setSubscriptions([]);
        res.data.subscriptions.forEach((subscription) => {
          setSubscriptions((subscriptions) => [
            ...subscriptions,
            {
              ...subscription,
              nextBill: format(
                add(parseISO(subscription.dateSubscribed), {
                  months: 1,
                }),
                "MMMM do, yyyy"
              ),
            },
          ]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/entertainment/list",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            id: localStorage.getItem("id"),
            fav: false,
          },
        }
      )
      .then((response) => {
        setMoviesList(response.data.data);
      })
      .catch((error) => {
        if (error.response.data.message === "Nothing exists in list")
          setMoviesList([]);
        else console.log(error.response);
      });
  }, []);

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
        setGenres({
          movieGenres: response.data.movieGenres,
          tvGenres: response.data.tvGenres,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/communication/group",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            member: localStorage.getItem("id"),
          },
        }
      )
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/communication/group",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            member: localStorage.getItem("id"),
          },
        }
      )
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        pr: 5,
        pl: 5,
      }}
    >
      <Grid
        container
        spacing={5}
        sx={{
          pt: 7,
        }}
      >
        <Grid item xs={12} lg={9} spacing={5}>
          <Grid
            container
            spacing={3}
            sx={{
              pr: 5,
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ border: "grey solid 5px", borderRadius: "20px", mb: 2 }}
            >
              <Typography variant="h4" fontWeight="500" marginBottom={2}>
                Your Subscriptions
              </Typography>
              <Grid container spacing={3}>
                {Subscriptions.length > 0 ? (
                  Subscriptions.slice(
                    Subscriptions.length - 2,
                    Subscriptions.length
                  )
                    .reverse()
                    .map((sub) => (
                      <Grid item key={sub._id} lg={6}>
                        <SubscriptionCard key={sub._id} {...sub} />
                      </Grid>
                    ))
                ) : (
                  <Grid
                    sx={{ height: "30vh" }}
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack direction="column" alignItems="center" spacing={3}>
                      <Typography variant="h5" fontWeight={500}>
                        You have no subscriptions
                      </Typography>

                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#22C55E", margin: "10px" }}
                        onClick={() => navigate("/subscription/all")}
                      >
                        Manage my subscription
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ border: "grey solid 5px", borderRadius: "20px" }}
            >
              <Typography variant="h4" fontWeight="500">
                Your Watch List
              </Typography>

              {moviesList.length > 0 && Object.keys(genres).length !== 0 ? (
                <Grid container>
                  {moviesList?.slice(0, 2).map((movie) => (
                    <Grid item lg={6}>
                      <EntertainmentCard
                        key={movie.id}
                        {...movie}
                        {...genres}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Stack
                  height="25vh"
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Typography fontWeight={500} variant="h5">
                    You have no movies
                  </Typography>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#22C55E", margin: "10px" }}
                    onClick={() => navigate("/entertainment")}
                  >
                    Add One
                  </Button>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={3}
          md={12}
          sm={12}
          xs={12}
          sx={{ border: "grey solid 5px", borderRadius: "20px", mt: 2 }}
        >
          <Typography variant="h4" fontWeight="500">
            Your Groups
          </Typography>
          <div
            className="groupChatContainer"
            style={{
              height: "48vh",
              overflowY: "auto",
              marginTop: "2rem",
            }}
          >
            {groups.map((group, key) => (
              <div key={key}>
                <Stack
                  direction="row"
                  alignItems="center"
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "0.5rem",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                  onClick={() => navigate("/communication")}
                  className="conversation"
                  spacing={2}
                >
                  <Avatar {...stringAvatar(group.conversationName)} />

                  <Typography fontWeight={500} fontSize={18}>
                    {group.conversationName}
                  </Typography>
                </Stack>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
