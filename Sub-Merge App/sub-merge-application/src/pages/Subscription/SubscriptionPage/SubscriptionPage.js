import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import Footer from "../../../components/Footer/Footer";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  width: 120,
  height: 30,
  textTransform: "none",
  fontSize: 15,
  fontWeight: 15,
  padding: "6px 12px",
  backgroundColor: "#22C55E",
  color: "white",
  borderRadius: "80px",
  ":hover": {
    backgroundColor: "#22C55E",
    color: "white",
  },
});

const SubButton = styled(Button)({
  boxShadow: "none",
  width: 120,
  height: 30,
  textTransform: "none",
  fontSize: 15,
  fontWeight: 20,
  padding: "6px 12px",
  backgroundColor: "#22C55E",
  color: "white",
  borderRadius: "80px",
  ":hover": {
    backgroundColor: "#22C55E",
    color: "white",
  },
});

const SubButton2 = styled(Button)({
  boxShadow: "none",
  width: 145,
  height: 30,
  textTransform: "none",
  fontSize: 15,
  fontWeight: 20,
  padding: "6px 12px",
  backgroundColor: "#22C55E",
  color: "white",
  borderRadius: "80px",
  ":hover": {
    backgroundColor: "#22C55E",
    color: "white",
  },
});

const img1 = require("../SubscriptionPage/container1.jpg");
const img2 = require("../SubscriptionPage/container2.png");
const img3 = require("../SubscriptionPage/container3.jpg");
const mailicon = require("../SubscriptionPage/mail-icon.png");
const analyst = require("../SubscriptionPage/analyst.png");
const group = require("../SubscriptionPage/group.png");
const mins = require("../SubscriptionPage/60secs.png");

export default function SubscriptionPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xll"
        style={{ paddingLeft: "150px", paddingRight: "150px" }}
      >
        <Box sx={{ height: "100vh", marginTop: "20vh" }}>
          <Grid container>
            <Grid item xs>
              <BootstrapButton>SUBMERGE</BootstrapButton>

              <Typography
                component="h1"
                variant="h1"
                align="left"
                color="text.primary"
                fontWeight={"bold"}
                marginTop={"5px"}
                gutterBottom
              >
                Why worry about it yourself?
              </Typography>

              <Typography
                component="h5"
                variant="h5"
                align="left"
                fontStyle={"italic"}
                marginTop={"5px"}
                gutterBottom
              >
                Tools are made to solve your problems.
              </Typography>

              <List xs={{ width: "100%", maxWidth: 400 }} aria-label="contacts">
                <ListItem sx>
                  <ListItemButton>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Manage Your Subscription" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx>
                  <ListItemButton>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Cut down on cost of unused subscriptions" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx>
                  <ListItemButton>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Make better use of your subscription " />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs>
              <img
                alt="firstIMG"
                style={{
                  borderRadius: 25,
                  marginTop: 65,
                  height: "43vh",
                  width: "35vw",
                }}
                src={img1}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ height: "110vh" }}>
          <Stack
            sx={{ pt: 3 }}
            direction="row"
            justifyContent="center"
            marginBottom={4}
          >
            <SubButton>FEATURES</SubButton>
          </Stack>
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
            fontWeight="bold"
            gutterBottom
          >
            Capabilities that make you wonder
          </Typography>
          <Typography
            component="h5"
            variant="h6"
            align="center"
            color="text.secondary"
          >
            Information that you never thought would have been important in
            managing your subscriptions.
          </Typography>

          <Grid
            container
            columns={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} textAlign="center">
              <img
                alt="secondIMG"
                style={{
                  borderRadius: 25,
                  marginTop: 70,
                  marginBottom: 100,
                  height: "35vh",
                  width: "35vw",
                }}
                src={img2}
              />
            </Grid>
          </Grid>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={4}
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              <Grid item xs={4}>
                <Box sx={{ height: "30vh" }}>
                  <img
                    alt="thirdIMG"
                    style={{
                      width: "4em",
                      borderRadius: 25,
                      marginBottom: 15,
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={mailicon}
                  />

                  <Typography
                    component="h4"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Mail Updates
                  </Typography>

                  <Typography
                    component="h6"
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    Receive regular email updates of all upcoming payments for
                    subscriptions.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ height: "30vh" }}>
                  <img
                    alt="thirdIMG"
                    style={{
                      width: "4em",
                      borderRadius: 25,
                      marginBottom: 15,
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={analyst}
                  />

                  <Typography
                    component="h4"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Custom analytics
                  </Typography>

                  <Typography
                    component="h6"
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    A subscription dashboard consisting of all the information
                    that could help you cut down on costs of subscription.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ height: "30vh" }}>
                  <img
                    alt="thirdIMG"
                    style={{
                      width: "4em",
                      borderRadius: 25,
                      marginBottom: 15,
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={group}
                  />

                  <Typography
                    component="h4"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Easy Management
                  </Typography>

                  <Typography
                    component="h6"
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    A few clicks to add your subcription to our management
                    system and we take care of the rest.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ height: "inherit", marginTop: 20 }}>
          <Stack
            sx={{ pt: 3 }}
            direction="row"
            spacing={2}
            justifyContent="left"
            marginBottom={2}
          >
            <SubButton>PRICING</SubButton>
          </Stack>
          <Typography
            component="h2"
            variant="h3"
            align="left"
            color="text.primary"
            fontWeight={"bold"}
            gutterBottom
          >
            Flexible pricing plan for your worries?
          </Typography>

          <Typography
            component="h5"
            variant="h6"
            align="left"
            color="text.secondary"
          >
            Pricing that scales with your needs.
          </Typography>

          <Box sx={{ marginTop: 6 }}>
            <Grid container spacing={3} justifyContent="space-evenly">
              <Grid item xs={4}>
                <Box
                  sx={{
                    bgcolor: "#F5F5F5",
                    height: "inherit",
                    borderRadius: 3,
                    padding: 3,
                  }}
                >
                  <Stack
                    sx={{ pt: 3 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    marginBottom={2}
                  >
                    <SubButton>PRICING</SubButton>
                  </Stack>
                  <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    color={"#22C55E"}
                  >
                    Basic Plan
                  </Typography>
                  <Typography
                    variant="h3"
                    gutterBottom
                    component="h4"
                    align="center"
                  >
                    Free
                  </Typography>
                  <List
                    xs={{ width: "100%", maxWidth: 400 }}
                    aria-label="contacts"
                  >
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="10 Subscriptions Limit" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Content Filter per Subscriptions" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Brief Reports of Subscriptions" />
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Button
                    size="large"
                    variant="contained"
                    style={{
                      backgroundColor: "#22C55E",
                      width: "85%",
                      marginLeft: "8%",
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  sx={{
                    bgcolor: "#F5F5F5",
                    height: "inherit",
                    borderRadius: 3,
                    padding: 3,
                  }}
                >
                  <Stack
                    sx={{ pt: 3 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    marginBottom={2}
                  >
                    <SubButton>PRICING</SubButton>
                  </Stack>
                  <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    color={"#00CC00"}
                  >
                    Premium Plan
                  </Typography>
                  <Typography
                    variant="h3"
                    gutterBottom
                    component="h4"
                    align="center"
                  >
                    $4.49/mth
                  </Typography>
                  <List
                    xs={{ width: "100%", maxWidth: 400 }}
                    aria-label="contacts"
                  >
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="25 Subscriptions Limit" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="All Basic Plan Features" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Detailed Reports of Subscriptions" />
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Button
                    size="large"
                    variant="contained"
                    style={{
                      backgroundColor: "#22C55E",
                      width: "85%",
                      marginLeft: "7%",
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  sx={{
                    bgcolor: "#F5F5F5",
                    height: "inherit",
                    borderRadius: 3,
                    padding: 3,
                  }}
                >
                  <Stack
                    sx={{ pt: 3 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    marginBottom={2}
                  >
                    <SubButton>PRICING</SubButton>
                  </Stack>
                  <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    color={"#00CC00"}
                  >
                    Professional Plan
                  </Typography>
                  <Typography
                    variant="h3"
                    gutterBottom
                    component="h4"
                    align="center"
                  >
                    $49.99/year
                  </Typography>
                  <List
                    xs={{ width: "100%", maxWidth: 400 }}
                    aria-label="contacts"
                  >
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Unlimited Subscriptions" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="All Premium Plan Features" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem sx>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Up-to-date with all new features" />
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Button
                    size="large"
                    variant="contained"
                    style={{
                      backgroundColor: "#22C55E",
                      width: "85%",
                      marginLeft: "8%",
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: "#232B37",
            height: "50vh",
            marginBottom: "15%",
            borderRadius: "10px",
          }}
        >
          <Grid
            container
            columns={10}
            justifyContent="space-between"
            marginTop={20}
          >
            <Grid item xs={5}>
              <Typography
                component="h3"
                variant="h3"
                align="left"
                fontWeight={"bold"}
                marginTop={"6vh"}
                marginLeft={"2vw"}
                color="white"
                gutterBottom
              >
                The most convenient way to never forget what you’re subscribed
                to.
              </Typography>
              <Typography
                component="h4"
                variant="contained"
                align="left"
                color="gray"
                marginLeft={"2vw"}
                gutterBottom
              >
                Merge all your subscriptions.
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Stack container spacing={3} sx={{ pt: 16 }} direction="row">
                <Box marginLeft={20}>
                  <Button
                    size="large"
                    variant="contained"
                    style={{ backgroundColor: "#22C55E", color: "white" }}
                    href="/login"
                  >
                    Register
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="large"
                    variant="contained"
                    style={{ backgroundColor: "#696969", color: "white" }}
                    href="/login"
                  >
                    Learn More
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginBottom: "10vh" }}>
          <Grid container>
            <Grid item xs={6}>
              <Stack
                sx={{ pt: 3 }}
                direction="row"
                spacing={3}
                justifyContent="left"
                marginBottom={4}
              >
                <SubButton2>HOW IT WORKS</SubButton2>
              </Stack>
              <Typography
                component="h2"
                variant="h3"
                align="left"
                color="text.primary"
                fontWeight={"bold"}
                gutterBottom
              >
                Steps to add a subscription simplified.
              </Typography>
              <Typography
                component="h5"
                variant="h6"
                align="left"
                color="text.secondary"
                gutterBottom
              >
                With our user friendly system we make it easy for you to add a
                subscription to our management system and leave the rest to us
                to manage not requiring more than 60 seconds of your day.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img
                alt="subscription"
                style={{
                  borderRadius: 20,
                  marginTop: 20,
                  marginLeft: 80,
                  height: "40vh",
                  width: "35vw",
                }}
                src={img3}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4} marginTop={"70px"}>
              <LooksOneIcon color="success" fontSize="large" />
              <Typography
                component="h4"
                variant="h5"
                align="left"
                color="text.primary"
                fontWeight={"bold"}
                gutterBottom
              >
                Choose your subscription platform
              </Typography>
              <Typography
                component="h6"
                variant="h7"
                align="left"
                color="text.secondary"
                gutterBottom
              >
                Make a selection from our pre-populated list of subscriptions.
              </Typography>

              <Looks3Icon color="success" fontSize="large" />
              <Typography
                component="h4"
                variant="h5"
                align="left"
                color="text.primary"
                fontWeight={"bold"}
                gutterBottom
              >
                Pick a date
              </Typography>
              <Typography
                component="h6"
                variant="h7"
                align="left"
                color="text.secondary"
                gutterBottom
              >
                Let us know when you subscribed to the service.
              </Typography>
            </Grid>

            <Grid item xs={4} marginTop={"70px"}>
              <LooksTwoIcon color="success" fontSize="large" />
              <Typography
                component="h4"
                variant="h5"
                align="left"
                color="text.primary"
                fontWeight={"bold"}
                gutterBottom
              >
                Choose your tier
              </Typography>
              <Typography
                component="h6"
                variant="h7"
                align="left"
                color="text.secondary"
                gutterBottom
              >
                We show you the tiers for your platform and all you do is choose
                which one you are subscribed to.
              </Typography>

              <Looks4Icon color="success" fontSize="large" />
              <Typography
                component="h4"
                variant="h5"
                align="left"
                color="text.primary"
                fontWeight={"bold"}
                gutterBottom
              >
                Is it gonna be recurring?
              </Typography>
              <Typography
                component="h6"
                variant="h7"
                align="left"
                color="text.secondary"
                gutterBottom
              >
                If you’ll be paying for it every month then we can manage that
                too and let you know when the payment will be due.
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <img
                alt="subscription2"
                style={{
                  marginLeft: 60,
                  height: "45vh",
                  width: "20vw",
                }}
                src={mins}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
