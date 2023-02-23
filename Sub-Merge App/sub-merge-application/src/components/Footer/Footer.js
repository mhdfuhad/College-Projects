import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Button, Divider } from "@mui/material";

function Footer() {
  return (
    <div>
      <Container maxWidth="xll" style={{ backgroundColor: "#13204a" }}>
        <Stack
          direction="row"
          justifyContent="center"
          style={{ paddingTop: "5vh" }}
        >
          <img src="../logo.jpg" alt="Logo" width={50} />
        </Stack>

        <Stack
          direction="row"
          spacing={15}
          justifyContent="center"
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            marginTop: "5vh",
            marginBottom: "5vh",
          }}
        >
          <Button style={{ color: "gray" }} href="/subscription/page">
            Subscriptions
          </Button>
          <Button style={{ color: "gray" }} href="/entertainment/page">
            Entertainment
          </Button>
          <Button style={{ color: "gray" }} href="/login">
            Login
          </Button>
          <Button style={{ color: "gray" }} href="/login">
            Register
          </Button>
          <Button style={{ color: "gray" }} href="/">
            Help
          </Button>
        </Stack>
        <Divider sx={{ color: "gray" }} orientation="vertical"></Divider>
        <Stack
          direction="row"
          justifyContent="center"
          style={{ color: "gray", padding: "5vh", fontSize: "1.2em" }}
        >
          <p>&copy; 2021 Sub-Merge. &nbsp; All rights reserved</p>
        </Stack>
      </Container>
    </div>
  );
}
export default Footer;
