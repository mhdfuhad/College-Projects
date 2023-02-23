import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import EntertainmentCard from "../EntertainmentCard/EntertainmentCard";
import Slider from "react-slick";
import { settings } from "./slicker_settings";

export default function SubscribedRecommended({ moviesList, genres }) {
  return (
    moviesList && (
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
            Recommendations as per subscribed services
          </Typography>
        </Box>
        <Box>
          <Slider {...settings}>
            {moviesList?.map((movie) => (
              <EntertainmentCard key={movie.id} {...movie} {...genres} />
            ))}
          </Slider>
        </Box>
      </>
    )
  );
}
