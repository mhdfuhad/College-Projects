// Material UI
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";

const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function RatingFilter({ rating }) {
  const handleOnChange = (event) => {
    rating.setRatingState(event.target.value);
  };

  return (
    <Box
      sx={{
        pb: 2,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="h5" gutterBottom>
          Rating
        </Typography>
        <Form.Select style={{ width: "max-content" }} onChange={handleOnChange}>
          {ratings.map((option, idx) => (
            <option key={idx} value={option}>
              {option}+
            </option>
          ))}
        </Form.Select>
      </Stack>
    </Box>
  );
}
