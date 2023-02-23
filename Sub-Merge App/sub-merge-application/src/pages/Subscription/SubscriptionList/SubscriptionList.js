// React Library
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { format, parseISO, add } from "date-fns";

// Components
import SubscriptionCard from "../SubscriptionCard/SubscriptionCard";
import CreateSubscription from "../CreateSubscription/CreateSubscription";

const theme = createTheme({
  typography: {
    h5: {
      fontFamily:
        "udemy sans,sf pro text,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol",
      fontWeight: 600,
      fontSize: "30px",
    },
    h4: {
      fontFamily:
        "SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol",
      fontWeight: 700,
      fontSize: "40px",
      letterSpacing: "-.5px",
    },
  },
});

export default function SubscriptionList() {
  const [modalShow, setModalShow] = useState(false);
  const [Subscriptions, setSubscriptions] = useState([]);
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

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Your Subscriptions
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: "#22C55E" }}
                onClick={() => setModalShow(true)}
              >
                Add New Subscription
              </Button>
              <Button
                size="large"
                variant="outlined"
                style={{ color: "black", borderColor: "black" }}
                onClick={() => navigate("/subscription", { replace: true })}
              >
                Go to Dashboard
              </Button>
            </Stack>
            <CreateSubscription
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Container>
        </Box>
        <Container sx={{ py: 12 }} maxWidth="xl">
          <Grid container spacing={8} columns={12}>
            {Subscriptions.length > 0 ? (
              Subscriptions.map((sub) => (
                <Grid item key={sub._id} xs={12} sm={6} md={4} lg={3}>
                  <SubscriptionCard key={sub._id} {...sub} />
                </Grid>
              ))
            ) : (
              <Grid
                sx={{ ml: 12 }}
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <h1>You have no subscriptions</h1>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
