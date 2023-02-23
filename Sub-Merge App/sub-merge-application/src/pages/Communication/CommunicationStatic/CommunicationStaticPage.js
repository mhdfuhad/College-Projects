import React from "react";
import "./CommunicactionStaticPage.css";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Footer from "../../../components/Footer/Footer";

function CommunicationStaticPage() {
  return (
    <>
      <div className="commPage">
        <Container maxWidth="sm" className="mainheader">
          <header>
            <h6 className="communication_header_heading">Communication</h6>
            <h1 className="communication_header_subtitle">
              Accessible Features
            </h1>
            <p className="communication_header_description">
              Features available for users to navigate through communication
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
                Video
              </h3>
              <p
                style={{
                  color: "#008b8b",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Friends, family can <br /> communicate and see each
                <br /> other from their comfort zone
              </p>

              <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
                Audio
              </h3>
              <p
                style={{
                  color: "#008b8b",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Communicate at your own <br /> convenience without
                <br />
                seeing each other
              </p>
            </Grid>
            <Grid item xs={4}>
              <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
                Group Conferencing
              </h3>
              <p
                style={{
                  color: "#008b8b",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Convenience in communicating
                <br /> between students, employees
                <br /> and client
              </p>

              <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
                Chatting
              </h3>
              <p
                style={{
                  color: "#008b8b",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Communicate with friends
                <br /> and family at your convenience
                <br /> without hearing or seeing them
              </p>
            </Grid>
            <Grid item xs={4} alignItems="center">
              <img
                className="main_content_image"
                src="../CommunicationPageImage\look-your-best-on-video-call.jpg"
                alt="Error rendering"
              />
            </Grid>
          </Grid>

          <Container
            maxWidth="sm"
            className="communication_mid_section_content"
            style={{ marginTop: "28vh" }}
          >
            <Stack
              direction={{ xs: "row", sm: "row", md: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Stack direction="row" spacing={2}>
                <img
                  className="communication_mid_content_image"
                  src="../CommunicationPageImage/54_Online-Chatting_R.jpg"
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
                <p className="communication_mid_content_title">Why</p>
                <p className="communication_mid_content_description">
                  Convenience in communicating <br />
                  from your comfort zones
                </p>
              </Stack>
            </Stack>
          </Container>

          <Container>
            <Grid container columns={12} style={{ marginTop: "35vh" }}>
              <Grid item xs={8}>
                <p className="communication_detail_title">DETAILS</p>
                <h1 className="communication_detail_content_title">
                  Insights on our features
                </h1>
                <p className="communication_detail_description">
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
                    href="/login"
                  >
                    Communication
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default CommunicationStaticPage;
