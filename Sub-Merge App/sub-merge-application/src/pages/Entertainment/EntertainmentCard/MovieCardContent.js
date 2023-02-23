import Typography from "@mui/material/Typography";
export default function MovieCardContent({
  dateRelease,
  genre,
  ageRating,
  description,
  runtime,
}) {
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

  return (
    <>
      <Typography variant="subtitle1" color="text.primary" component="div">
        Release: {dateRelease}
      </Typography>
      <Typography variant="subtitle1" color="text.primary" component="div">
        Genre: {genre}
      </Typography>
      <Typography variant="subtitle1" color="text.primary" component="div">
        Age: {ageRating}+
      </Typography>
      <Typography variant="subtitle1" color="text.primary" component="div">
        Runtime: {timeConvert(runtime)}
      </Typography>
      <Typography
        sx={{
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }}
        variant="subtitle1"
        color="text.primary"
        component="div"
      >
        Description: {` ${description}`}
      </Typography>
    </>
  );
}
