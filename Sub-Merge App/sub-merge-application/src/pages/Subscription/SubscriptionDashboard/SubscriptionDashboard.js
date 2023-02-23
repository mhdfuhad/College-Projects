// React Library
import { useEffect, useState } from "react";
import axios from "axios";

// Material UI
import { Grid } from "@mui/material";
import { format, parseISO, add } from "date-fns";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Component
import ViewAllBtn from "./ViewAllBtn";
import SummaryCard from "./SummaryCard";
import SubscriptionCard from "../SubscriptionCard/SubscriptionCard";
import CreateSubscription from "../CreateSubscription/CreateSubscription";
import ReportChart from "../SubscriptionReport/ReportChart";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function SubscriptionDashboard() {
  const { enqueueSnackbar } = useSnackbar();
  const [Subscriptions, setSubscriptions] = useState([]);
  const [ReportData, setReportData] = useState({});
  const [ReportSummary, setReportSummary] = useState(null);
  const [chartData, setChartData] = useState({});
  const [reportExists, setReportExists] = useState(false);
  const [modalShow, setModalShow] = useState(false);
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

        axios
          .get(
            process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
              "api/subscription/report/" +
              localStorage.getItem("id"),
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            setReportData(res.data.report);
            setReportSummary({
              mostExpensiveSubscription: res.data.report.expensiveSub,
              expiringSoon: res.data.report.expiringSoon,
              oldestSubscription: res.data.report.oldestSub,
              lastPaymentAmount: res.data.report.lastPaymentAmt,
              upcomingPaymentAmount: res.data.report.nextPaymentAmt,
              totalPaymentAmount: res.data.report.totalPaymentCurrentMonth,
            });
            setChartData(res.data.report.categoryData.categories);
            setReportExists(true);
          })
          .catch((err) => {
            if (err.response.data.message === "No subscriptions found") {
              setReportExists(false);
              return;
            }

            console.log(err.response);
            enqueueSnackbar(
              "An error occurred in fetching reports, please try again later.",
              {
                variant: "error",
              }
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const theme = createTheme({
    typography: {
      h4: {
        fontFamily:
          "SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol",
        fontWeight: 700,
        fontSize: "45px",
        letterSpacing: "-.5px",
        lineHeight: "1.15",
      },
      h5: {
        fontFamily:
          "udemy sans,sf pro text,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol",
        fontWeight: 600,
        fontSize: "30px",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 4,
            pr: 5,
            pl: 5,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                component="h1"
                variant="h4"
                color="text.primary"
                gutterBottom
              >
                Subscriptions Dashboard
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: "#22C55E", margin: "10px" }}
                onClick={() => setModalShow(true)}
              >
                Add New Subscription
              </Button>
              {reportExists !== false ? (
                <Button
                  size="large"
                  variant="contained"
                  style={{ backgroundColor: "#22C55E", margin: "10px" }}
                  onClick={() =>
                    navigate("/subscription/report", { state: { ReportData } })
                  }
                >
                  Show Reports
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  disabled
                  style={{ backgroundColor: "#22C55E", margin: "10px" }}
                  onClick={() =>
                    navigate("/subscription/report", { state: { ReportData } })
                  }
                >
                  Show Reports
                </Button>
              )}
            </Grid>
            <CreateSubscription
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {Subscriptions.length > 0 ? (
                  Subscriptions.slice(
                    Subscriptions.length - 2,
                    Subscriptions.length
                  )
                    .reverse()
                    .map((sub) => (
                      <Grid item key={sub._id} lg={4} md={6} sm={6} xs={12}>
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
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={4}
                  xs={12}
                  style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ViewAllBtn />
                </Grid>
                {reportExists !== false ? (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    style={{
                      margin: "20px",
                      paddingRight: "8vw",
                      backgroundColor: "#F7F8FA",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography variant="h5">
                      Managed Subscription Categories
                    </Typography>

                    <ReportChart data={chartData} />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              {reportExists !== false ? (
                <SummaryCard summary={ReportSummary} />
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </main>
    </ThemeProvider>
  );
}
