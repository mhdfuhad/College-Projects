import Container from "@mui/material/Container";
import SearchBar from "../SearchBar/SearchBar";
import { Button, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import "./EntertainmentPage.css";
import PopularMovies from "./PopularMovies";
import TenRandomMovies from "./TenRandomMovies";
import SubscribedRecommended from "./SubscribedRecommended";
import SearchResults from "./SearchResults";
import { SubscriptionData } from "../../Subscription/SubscriptionData";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    h4: {
      fontFamily: "'Libre Franklin', sans-serif",
      fontWeight: 700,
      fontSize: "35px",
      letterSpacing: "-.5px",
      lineHeight: "1.15",
    },
  },
});

export default function EntertainmentPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [subscribedMovies, setSubscribedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [tenRandomMovies, setTenRandomMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState({});
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (search !== "") {
      const strGenres =
        searchFilter.hasOwnProperty("setGenres") && searchFilter.setGenres
          ? searchFilter.setGenres.join(",")
          : "";
      const strPlatforms =
        searchFilter.hasOwnProperty("setPlatforms") && searchFilter.setPlatforms
          ? searchFilter.setPlatforms.join(",").toLowerCase()
          : "";
      const strLanguage = searchFilter.hasOwnProperty("language")
        ? searchFilter.language
        : "";

      const boolTv = searchFilter.hasOwnProperty("movie")
        ? !searchFilter.movie
        : false;

      const ratingNum = searchFilter.hasOwnProperty("setRating")
        ? searchFilter.setRating
        : 0;

      axios
        .get(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            `api/entertainment/search`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },

            params: {
              query: search,
              genres: strGenres,
              services: strPlatforms,
              lang: strLanguage,
              tv: boolTv,
            },
          }
        )
        .then((res) => {
          if (res.data.data.result === 0) {
            enqueueSnackbar("No results found", {
              variant: "warning",
            });
            setSearchResults(res.data.data.items);
            return;
          }

          console.log(res.data.data.items);

          const filteredResults = res.data.data.items.filter(
            (item) => item.imdbRating / 10 >= ratingNum
          );
          setSearchResults(filteredResults);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/user/subscribed",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          const ArrayTVServices = SubscriptionData.filter(
            (subscribed) => subscribed.category === "Television Streaming"
          );

          const ArrayTVServicesSubscribed = ArrayTVServices.filter(
            (subscribed) => res.data.subscribed.includes(subscribed.platform)
          );

          const services = ArrayTVServicesSubscribed.map((subscribed) =>
            subscribed.platform.toLowerCase()
          ).join(",");

          axios
            .get(
              process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
                `api/entertainment/search`,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },

                params: {
                  services,
                },
              }
            )
            .then((res) => {
              setSubscribedMovies(res.data.data.items);
            })
            .catch((err) => {
              console.log(err);
            });

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

              axios
                .get(
                  process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
                    "api/entertainment/recommended",
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  setRecommendedMovies(res.data.data.items);
                })
                .catch((err) => {
                  console.log(err);
                });

              axios
                .get(
                  process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
                    "api/entertainment/random",
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  setTenRandomMovies(res.data.data.items.slice(0, 10));
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [submit]);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ overflow: "hidden" }} maxWidth="xll">
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <SearchBar
            submit={{ submit, setSubmit }}
            search={{ setSearch }}
            filter={{ setSearchFilter }}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            style={{
              marginTop: "2rem",
              backgroundColor: "#3b4146",
            }}
            onClick={() => navigate("/myList", { state: { genres } })}
          >
            Go to My List
          </Button>
        </Stack>

        {search !== "" && searchResults ? (
          <SearchResults moviesList={searchResults} genres={genres} />
        ) : (
          <>
            <SubscribedRecommended
              moviesList={subscribedMovies}
              genres={genres}
            />
            <PopularMovies moviesList={recommendedMovies} genres={genres} />
            <TenRandomMovies moviesList={tenRandomMovies} genres={genres} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
