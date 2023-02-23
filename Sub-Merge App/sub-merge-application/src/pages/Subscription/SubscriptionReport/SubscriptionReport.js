import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ReportChart from "./ReportChart";
import { format, parseISO } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";

export default function SubscriptionReport() {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();

  return state.ReportData ? (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="700"
            fontSize="50px"
            lineHeight="1.15"
            letterSpacing="-.5px"
            fontFamily="SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol"
          >
            Subscriptions Reports
          </Typography>
        </Container>
      </Box>

      <Box sx={{ width: "80vw", margin: "auto" }}>
        <Grid container spacing={8} ml="5px">
          <Grid item xs={12} lg={6}>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Total Payment Current Month:
              <em>
                <strong>
                  {" "}
                  ${state.ReportData.totalPaymentCurrentMonth.toPrecision(4)}
                </strong>
              </em>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Last Payment Amount:
              <em>
                <strong>
                  {" "}
                  ${state.ReportData.lastPaymentAmt.toPrecision(4)} on{" "}
                  {format(
                    parseISO(state.ReportData.lastPaymentDate),
                    "MMMM dd, yyyy"
                  )}
                </strong>
              </em>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Upcoming Subscription Payment:
              <em>
                <strong>
                  {" "}
                  ${state.ReportData.nextPaymentAmt.toFixed(2)} on{" "}
                  {format(
                    parseISO(state.ReportData.nextPaymentDate),
                    "MMMM dd, yyyy"
                  )}
                </strong>
              </em>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Expiring Soon:
              <em>
                <strong>
                  {" "}
                  {Array.isArray(state.ReportData.expiringSoon)
                    ? state.ReportData.expiringSoon.join(", ")
                    : state.ReportData.expiringSoon}
                </strong>
              </em>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Most Recent Subscription:
              <em>
                <strong> {state.ReportData.mostRecentSub}</strong>
              </em>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Most Expensive Category:
              <em>
                <strong>
                  {" "}
                  {
                    state.ReportData.categoryData.mostExpensiveCategory.category
                  }{" "}
                  at $
                  {state.ReportData.categoryData.mostExpensiveCategory.amount.toPrecision(
                    4
                  )}
                </strong>
              </em>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Least Expensive Category:
              <em>
                <strong>
                  {" "}
                  {
                    state.ReportData.categoryData.leastExpensiveCategory
                      .category
                  }{" "}
                  at $
                  {state.ReportData.categoryData.leastExpensiveCategory.amount.toFixed(
                    2
                  )}
                </strong>
              </em>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Most Expensive Subscription:
              <em>
                <strong>
                  {" "}
                  {state.ReportData.expensiveSub} at{" $"}
                  {state.ReportData.expensiveSubAmt.toFixed(2)}
                </strong>
              </em>
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Least Expensive Subscription:
              <em>
                <strong>
                  {" "}
                  {state.ReportData.leastExpensiveSub} at{" $"}
                  {state.ReportData.leastExpensiveSubAmt.toFixed(2)}
                </strong>
              </em>
            </Typography>

            <Typography
              component="h4"
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              Oldest Subscription:
              <em>
                <strong> {state.ReportData.oldestSub}</strong>
              </em>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "80vw", marginTop: "5vh" }}>
        <Grid container>
          <Grid item xs={8}>
            <ReportChart data={state.ReportData.categoryData.categories} />
          </Grid>

          <Grid item xs={4}>
            <Stack
              sx={{ pt: 10 }}
              direction="column"
              spacing={2}
              justifyContent="center"
              marginLeft={"40%"}
            >
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: "#22C55E", borderRadius: "10px" }}
                onClick={() => window.print()}
              >
                Print Report
              </Button>

              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: "#22C55E", borderRadius: "10px" }}
                onClick={() => navigate("/subscription")}
              >
                Go to Dashboard
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  ) : (
    <div>
      <Typography
        component="h4"
        variant="h4"
        color="text.secondary"
        gutterBottom
      >
        Loading...
      </Typography>
    </div>
  );
}
