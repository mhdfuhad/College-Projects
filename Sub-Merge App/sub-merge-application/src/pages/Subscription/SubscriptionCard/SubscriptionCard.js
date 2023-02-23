// Css file
import "./SubscriptionCard.css";

// Material UI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MoreIconMenu from "../MoreIconMenu/MoreIconMenu";
import { format, parseISO } from "date-fns";
import { red } from "@mui/material/colors";

import { useState } from "react";
import SubscriptionsDetailsModal from "../SubscriptionDetailsModal/SubscriptionDetailsModal";

export default function SubscriptionCard(props) {
  const [modalShow, setModalShow] = useState(false);
  const { amount, dateSubscribed, platform, logo, img, nextBill, recurring } =
    props;

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: "#F6F6F6",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={logo} />
          }
          action={<MoreIconMenu {...props} />}
          title={platform}
          subheader={
            "Since " + format(parseISO(dateSubscribed), "MMMM do, yyyy")
          }
        />
        <CardMedia
          component="img"
          image={img}
          alt="random"
          height="250"
          className="cardMedia"
          onClick={() => setModalShow(true)}
          style={{ cursor: "pointer" }}
        ></CardMedia>
        <CardContent
          sx={{ flexGrow: 1 }}
          onClick={() => setModalShow(true)}
          style={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "baseline",
              mb: 2,
            }}
          >
            <Typography component="h2" variant="h5" color="text.primary">
              ${amount}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              /mo
            </Typography>
          </Box>

          {recurring ? (
            <Typography variant="overline" fontWeight="700">
              Next billing: {nextBill}
            </Typography>
          ) : (
            <Typography variant="overline" fontWeight="700">
              Expires on: {nextBill}
            </Typography>
          )}
          <CardActions>
            <Button
              size="medium"
              variant="contained"
              style={{
                marginLeft: "-0.7vw",
                marginBottom: "-1vh",
              }}
              onClick={() => setModalShow(true)}
            >
              Click to view more details
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <SubscriptionsDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props._id}
      />
    </>
  );
}
