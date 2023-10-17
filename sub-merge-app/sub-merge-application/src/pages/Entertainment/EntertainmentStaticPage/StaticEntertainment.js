import React from "react";
import "./StaticEntertainment.css";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Footer from "../../../components/Footer/Footer";

function StaticEntertainment() {
  return (
    <div>
      <Container maxWidth="sm" className="mainheader">
        <header>
          <h6 className="header_heading">SUBMERGE</h6>
          <h1 className="header_subtitle">Quick to find</h1>
          <p className="header_description">
            We help you find the content you are interested in
          </p>
        </header>
      </Container>
      <Container
        maxWidth="false"
        className="main_section"
        style={{ margin: "8vh", height: "100vh" }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          style={{ marginLeft: "-90px" }}
        >
          <Grid item xs={4}>
            <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
              Search
            </h3>
            <p
              style={{
                color: "#008b8b",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Use our Search engine to find <br /> the movies or shows you want{" "}
              <br /> to watch
            </p>

            <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
              Redirect
            </h3>
            <p
              style={{
                color: "#008b8b",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Use easy links provided by us to <br /> be redirected directly to
              the <br /> platform that provides this <br /> content
            </p>
          </Grid>
          <Grid item xs={4}>
            <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
              Filter
            </h3>
            <p
              style={{
                color: "#008b8b",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Filter through your searches to your <br /> liking be it genres,
              ratings or <br /> even platforms that stream it
            </p>

            <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>Save</h3>
            <p
              style={{
                color: "#008b8b",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Save it for latter if something has
              <br /> has come up suddenly or you were
              <br /> just in the middle of finding
              <br /> something to watch later
            </p>
          </Grid>
          <Grid item xs={4} alignItems="center">
            <img
              className="main_content_image"
              src="../EntertainmentPageImages/Rectangle 15.png"
              alt="Error rendering"
            />
          </Grid>
        </Grid>

        <Container
          maxWidth="sm"
          className="mid_section_content"
          style={{ marginTop: "8vh" }}
        >
          <Stack
            direction={{ xs: "row", sm: "row", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Stack direction="row" spacing={2}>
              <img
                className="mid_content_image"
                src="../EntertainmentPageImages/eran-menashri-Ae7pSsfzEHs-unsplash.jpg"
                alt="Error rendering"
                style={{
                  width: "25vw",
                  boxShadow: "-40px 10px LightGray",
                  position: "absolute",
                  left: "105px",
                }}
              />
            </Stack>
            <Stack direction="column" spacing={1} justifyContent="center">
              <p className="mid_content_title">Why</p>
              <p className="mid_content_description">
                Convenience in bringing all <br />
                you subscriptions together.
              </p>
            </Stack>
          </Stack>
        </Container>

        <Container>
          <Grid container columns={12} style={{ marginTop: "23vh" }}>
            <Grid item xs={8}>
              <p className="detail_title">DETAILS</p>
              <h1 className="detail_content_title">
                Check out this feature now
              </h1>
              <p className="detail_description">
                You're a few clicks away from being able to use this feature.
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
                  href="/login"
                >
                  Register
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
                  href="/login"
                >
                  Login
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}

export default StaticEntertainment;
