// Material UI
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";

export default function TvMoviesFilter(props) {
  const handleOnChange = (event) => {
    props.movie.setMovie(!event.target.checked);
  };

  return (
    <Box
      sx={{
        pb: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Movie/Television Series
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Movies</Typography>
        <Switch onChange={handleOnChange} />
        <Typography>TV Series</Typography>
      </Stack>
    </Box>
  );
}
