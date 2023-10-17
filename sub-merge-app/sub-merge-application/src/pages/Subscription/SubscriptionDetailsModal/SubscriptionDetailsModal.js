import Box from "@mui/material/Box";
import { Modal } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO, add } from "date-fns";

const SubscriptionDetailsModal = (props) => {
  const [subscription, setSubscription] = useState({});
  const [subscriptionDetailsList, setSubscriptionDetailsList] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/subscription/get/" +
          props.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((sub) => {
        setSubscriptionDetailsList(sub.data.dates);
        setSubscription({
          ...sub.data.subscription,
          nextBill: format(
            add(parseISO(sub.data.subscription.dateSubscribed), {
              months: 1,
            }),
            "MMMM do, yyyy"
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id, subscription.dateSubscribed]);

  return (
    <div className="container">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ alignSelf: "center" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            {subscription.platform}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box>
            <section>
              <div className="container text-center">
                <Grid container spacing={1} columns={12}>
                  <Grid item xs={6}>
                    <Typography variant="overline" fontWeight="600">
                      <b>Tier:</b> {subscription.tier}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="overline" fontWeight="600">
                      <b>Price: </b> ${subscription.amount}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="overline" fontWeight="600">
                      <b>Date Subscribed: </b>
                      {subscription.dateSubscribed &&
                        format(
                          parseISO(subscription.dateSubscribed),
                          "MMMM do, yyyy"
                        )}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {subscription.recurring ? (
                      <Typography variant="overline" fontWeight="600">
                        <b> Next billing: </b>
                        {subscription.nextBill}
                      </Typography>
                    ) : (
                      <Typography variant="overline" fontWeight="600">
                        <b> Expires on:</b> {subscription.nextBill}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </div>

              <div className="container">
                <Typography
                  variant="overline"
                  fontWeight="600"
                  fontSize={"18px"}
                >
                  Payment History
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Tier</TableCell>
                        <TableCell align="center">Date Billed</TableCell>
                        <TableCell align="center">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscriptionDetailsList.map((item) => (
                        <TableRow
                          key={item}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">
                            {subscription.tier}
                          </TableCell>
                          <TableCell align="center">{item}</TableCell>
                          <TableCell align="center">
                            {subscription.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </section>
          </Box>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubscriptionDetailsModal;
