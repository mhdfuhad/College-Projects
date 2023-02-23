import React from "react";
import "./Home.css";
import Footer from "../../../components/Footer/Footer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddIcon from "@mui/icons-material/Add";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HotelIcon from "@mui/icons-material/Hotel";
import EmailIcon from "@mui/icons-material/Email";
import AppsIcon from "@mui/icons-material/Apps";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  width: 300,
  height: 150,
  textTransform: "none",
  fontSize: 21,
  fontWeight: 20,
  padding: "6px 12px",
  backgroundColor: "#D3D3D3",
  color: "black",
  borderRadius: "10px",
  ":hover": {
    backgroundColor: "#22C55E",
    color: "white",
  },
});

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Container
        maxWidth="xll"
        className="header"
        style={{
          paddingLeft: "150px",
          paddingRight: "150px",
        }}
      >
        <header>
          <h1 className="homepage_heading">
            All your subscriptions <br />
            in one place.
          </h1>
          <p className="homepage_main_text">
            Wanna be worry free of all those subscriptions you have of
            television <br /> and music streaming services or even any gaming
            services? <br /> Check out what we have to offer for your peace of
            mind.
          </p>
          <Container className="button_container">
            <Button variant="contained" onClick={() => navigate("/login")}>
              Register Now
            </Button>
          </Container>

          <Container className="image_container">
            <img
              className="main"
              src="./HomePagePictures/alexander-shatov-mr4JG4SYOF8-unsplash.jpg"
              alt="Nothing to show"
            />
          </Container>
        </header>
      </Container>

      <Container
        maxWidth="xll"
        className="grid"
        style={{
          paddingLeft: "150px",
          paddingRight: "150px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <BootstrapButton>
              <PersonAddAltIcon fontSize="large" />
              Create an Account
            </BootstrapButton>
          </Grid>
          <Grid item xs={3}>
            <BootstrapButton>
              <AddIcon fontSize="large" />
              Add your subscriptions
            </BootstrapButton>
          </Grid>
          <Grid item xs={3}>
            <BootstrapButton>
              <LibraryMusicIcon fontSize="large" />
              Surf For Entertainment
            </BootstrapButton>
          </Grid>
          <Grid item xs={3}>
            <BootstrapButton>
              <HotelIcon fontSize="large" />
              Stay worry free
            </BootstrapButton>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="xll"
        style={{
          paddingLeft: "150px",
          paddingRight: "150px",
          marginTop: "10vh",
        }}
      >
        <section>
          <p className="title_left">SUBSCRIPTIONS</p>
          <h1 className="maincontent_title">
            How we manage your subscriptions
          </h1>
          <h4 className="maincontent_subtitle">
            Just a few simple steps that help us manage your subscriptions
          </h4>

          <Container maxWidth="xll" className="subscription_grid">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            >
              <Grid item xs={4}>
                <p className="number">1</p>
                <p className="step_name">Platform</p>
                <p className="step_description">
                  Select the platform of the <br /> susbscription you'd like for
                  us to
                  <br />
                  manage
                </p>

                <p className="number">3</p>
                <p className="step_name">Date of subscription</p>
                <p className="step_description">When did you subscribe?</p>
              </Grid>
              <Grid item xs={4}>
                <p className="number">2</p>
                <p className="step_name">Tier</p>
                <p className="step_description">
                  Let us know the tier you have
                  <br /> chosen to subscribe on this
                  <br /> platform
                </p>

                <p className="number">4</p>
                <p className="step_name">Recurring</p>
                <p className="step_description">
                  is it a one time subscription?
                </p>
              </Grid>
              <Grid item xs={4}>
                <img
                  className="subscription_content_image"
                  src="./HomePagePictures/mel-poole-eo5Hrzyb4D0-unsplash.jpg"
                  alt="Nothing to show"
                  style={{
                    borderRadius: 20,
                    marginTop: 20,
                    marginLeft: 80,
                    height: "40vh",
                    width: "30vw",
                  }}
                />
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: "30vh" }}>
              <Grid item xs={6}>
                <img
                  src="./HomePagePictures/charlesdeluvio-MDUI8XIq6Mc-unsplash.jpg"
                  alt="Nothing to show"
                  style={{
                    borderRadius: 20,
                    marginTop: 20,
                    height: "40vh",
                    width: "35vw",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <p className="title_right">ENTERTAINMENT</p>
                <p className="description">
                  Let us help you find, filter and save the content you'd be
                  interested in.
                </p>

                <img
                  className="middle"
                  src="./HomePagePictures/Search.png"
                  alt="Nothing to show"
                  style={{
                    height: "15vh",
                    width: "15vw",
                  }}
                />
              </Grid>
            </Grid>

            <Grid container columns={12} style={{ marginTop: "20vh" }}>
              <Grid item xs={8}>
                <p className="detail_title">DETAILS</p>
                <h1 className="detail_content_title">
                  Find out more about features
                </h1>
                <p className="detail_description">
                  You might wanna know more about the details of our features.
                </p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Button
                    style={{
                      borderRadius: 4,
                      backgroundColor: "#22C55E",
                      padding: "10px",
                      color: "white",
                    }}
                    variant="contained"
                    href="/subscription/page"
                  >
                    Subscriptions
                  </Button>
                  <Button
                    className="entertainment"
                    style={{
                      borderRadius: 4,
                      backgroundColor: "#000000",
                      padding: "10px",
                      color: "white",
                    }}
                    variant="contained"
                    href="/entertainment/page"
                  >
                    Entertainment
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
          <Container
            maxWidth="false"
            style={{ marginTop: "20vh", marginBottom: "10vh" }}
          >
            <Grid
              container
              column
              spacing={4}
              columns={16}
              justifyContent="center"
            >
              <Stack spacing={4} marginRight="15vh">
                <EmailIcon style={{ fill: "#22C55E", fontSize: "25" }} />
                <p className="contact_email">Email</p>
                <p>contactus@submerge.ca</p>
              </Stack>

              <Stack column spacing={4}>
                <AppsIcon
                  style={{
                    fill: "#22C55E",
                    fontSize: "25",
                    borderRadius: "25px",
                  }}
                />
                <p className="contact_socials">Socials</p>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <FacebookIcon style={{ fill: "#22C55E" }} />
                  <TwitterIcon style={{ fill: "#22C55E" }} />
                  <InstagramIcon style={{ fill: "#22C55E" }} />
                </Stack>
              </Stack>
            </Grid>
          </Container>
        </section>
      </Container>
      <Footer />
    </div>
  );
}
export default Home;
