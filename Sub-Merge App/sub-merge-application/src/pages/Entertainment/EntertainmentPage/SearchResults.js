import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import EntertainmentCard from "../EntertainmentCard/EntertainmentCard";
import Grid from "@mui/material/Grid";

export default function SearchResults({ moviesList, genres }) {
  return (
    <>
      <Box
        sx={{
          marginTop: "5em",
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          align="left"
          color="text.primary"
          gutterBottom
          sx={{ marginLeft: "1rem" }}
        >
          Search Results
        </Typography>
      </Box>
      <Box>
        <Grid container>
          {moviesList ? (
            moviesList.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} lg={4}>
                <EntertainmentCard key={movie.id} {...movie} {...genres} />
              </Grid>
            ))
          ) : (
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ marginLeft: "1rem" }}
            >
              No results found
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}
