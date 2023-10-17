import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import EntertainmentCard from "../EntertainmentCard/EntertainmentCard";
import Grid from "@mui/material/Grid";

export default function WatchLater({ moviesList, genres }) {
  return moviesList.length > 0 ? (
    <>
      <Box>
        <Grid container>
          {moviesList.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} lg={4}>
              <EntertainmentCard key={movie.id} {...movie} {...genres} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  ) : (
    <Box
      sx={{
        marginTop: "5em",
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        You have no movies in your list
      </Typography>
    </Box>
  );
}
