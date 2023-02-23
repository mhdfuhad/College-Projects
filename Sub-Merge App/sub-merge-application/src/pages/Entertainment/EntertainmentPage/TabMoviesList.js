import { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyFavorites from "./MyFavorites";
import WatchLater from "./WatchLater";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

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

export default function TabMoviesList() {
  const { state } = useLocation();
  const [value, setValue] = useState("1");
  const [moviesList, setMoviesList] = useState([]);

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
            fav: value === "1" ? true : false,
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
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xll">
        <TabContext value={value}>
          <Box sx={{ marginTop: 5 }}>
            <Typography
              component="h2"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
              sx={{ marginLeft: "1rem", display: "inline-block" }}
            >
              {value === "1" ? "Favorite Movies" : "Watch Later"}
            </Typography>

            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              style={{ float: "right", display: "inline-block" }}
            >
              <Tab label="Favorite Movies" value="1" />
              <Tab label="Watch Later Movies" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <MyFavorites moviesList={moviesList} genres={state.genres} />
          </TabPanel>
          <TabPanel value="2">
            <WatchLater moviesList={moviesList} genres={state.genres} />
          </TabPanel>
        </TabContext>
      </Container>
    </ThemeProvider>
  );
}
