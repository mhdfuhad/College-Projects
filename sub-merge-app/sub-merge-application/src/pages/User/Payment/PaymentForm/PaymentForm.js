import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function PaymentForm(props) {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleClose = () => {
    props.setModalShow(false);
  };

  const addCardHandle = (event) => {
    event.preventDefault();
  };

  const onDataHandler = (event) => {
    let target = event.target; // Event, trigger gets reference to the current form element
    let name = target.name; // Name of field to be updated in state
    let value = target.value; // Value to be given when set/changed

    setCardData((cardData) => {
      return { ...cardData, [name]: value };
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add New Card
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            name="nameOnCard"
            value={cardData.nameOnCard}
            onChange={onDataHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={onDataHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            name="expDate"
            value={cardData.expDate}
            onChange={onDataHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            name="cvv"
            value={cardData.cvv}
            onChange={onDataHandler}
          />
        </Grid>
      </Grid>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={addCardHandle}>Add Card</Button>
    </React.Fragment>
  );
}
