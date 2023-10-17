// React Library
import { useState, useEffect } from "react";

// Material UI
import { Divider, Grid, Typography } from "@mui/material";

export default function SummaryCard(props) {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    setSummaryData({
      mostExp: props.summary.mostExpensiveSubscription,
      expireSoon: props.summary.expiringSoon,
      oldestSub: props.summary.oldestSubscription,
      lastPaymentAmt: props.summary.lastPaymentAmount,
      upcomingPaymentAmt: props.summary.upcomingPaymentAmount,
      totalAmtCurMonth: props.summary.totalPaymentAmount,
    });
  }, [props.summary]);

  return summaryData != null ? (
    <Grid
      container
      spacing={3}
      style={{
        backgroundColor: "#F7F8FA",
        marginTop: "0px",
        borderRadius: "10px",
        paddingRight: "30px",
      }}
    >
      <Grid item xs={12}>
        <Grid container alignContent="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Report Summary</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Most Expensive Subscription
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h5" color="inherit">
                      {summaryData.mostExp}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3.5 }} />
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Expiring Soon
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h5" color="inherit">
                      {Array.isArray(summaryData.expireSoon)
                        ? summaryData.expireSoon.join(", ")
                        : summaryData.expireSoon}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3.5 }} />
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Oldest Subscription
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h5" color="inherit">
                      {summaryData.oldestSub}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3.5 }} />
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Last Payment Amount
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h5" color="inherit">
                      $
                      {summaryData.lastPaymentAmt &&
                        summaryData.lastPaymentAmt.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3.5 }} />
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Upcoming Subscription Payment
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h5" color="inherit">
                      $
                      {summaryData.upcomingPaymentAmt &&
                        summaryData.upcomingPaymentAmt.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3.5 }} />
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Total Payment Current Month
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h5" color="inherit">
                      $
                      {summaryData.totalAmtCurMonth &&
                        summaryData.totalAmtCurMonth.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3.5 }} />
      </Grid>
    </Grid>
  ) : (
    <div>Loading...</div>
  );
}
