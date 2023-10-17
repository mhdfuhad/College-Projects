import LoginPage from "../Login/LoginPage";
import SignUpPage from "../Signup/SignUpPage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function LogorSignContainer(props) {
  return (
    <Box sx={{ flexGrow: 1, mx: 12 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={6}>
          <SignUpPage />
        </Grid>
        <Grid item xs={6}>
          <LoginPage />
        </Grid>
      </Grid>
    </Box>
  );
}
