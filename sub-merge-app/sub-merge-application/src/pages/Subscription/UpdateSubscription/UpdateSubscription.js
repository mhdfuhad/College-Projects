// React Library
import { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";

// Material UI, Bootstrap
import { Modal, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useSnackbar } from "notistack";

// Components
import { SubscriptionData } from "../SubscriptionData";

export default function UpdateSubscription(props) {
  const { enqueueSnackbar } = useSnackbar();
  const subscriptionList = SubscriptionData;
  const [tiers, setTiers] = useState([]);
  const [subscription, setSubscription] = useState({
    platform: props.platform,
    dateSubscribed: props.datesubscribed,
    amount: props.amount,
    recurring: props.recurring,
    tier: props.tier,
  });
  let platformIndex = subscriptionList.findIndex(
    (sub) => sub.platform === props.platform
  );

  const handleUpdateBtn = () => {
    if (
      subscription.dateSubscribed &&
      subscription.amount &&
      subscription.tier
    ) {
      axios
        .put(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/subscription/update/" +
            props.id,
          {
            tier: subscription.tier,
            amount: subscription.amount,
            recurring: subscription.recurring.toString(),
            dateSubscribed: subscription.dateSubscribed,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          enqueueSnackbar("Subscription updated successfully", {
            variant: "success",
          });
          props.onHide();
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.data.message === "Subscription not found") {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
            return;
          }

          console.log(err.response.data);
          enqueueSnackbar("Error updating subscription", {
            variant: "error",
          });
        });
    } else {
      enqueueSnackbar("Please fill out all fields", { variant: "warning" });
    }
  };

  const onDataHandler = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    setSubscription((prevSub) => {
      return { ...subscription, [name]: value };
    });
  };

  const OnTierChange = (e) => {
    let stier = e.target.value;
    subscriptionList[platformIndex].tiers.forEach((tier) => {
      if (tier.tier === stier) {
        subscription.amount = tier.price;
      }
    });
    setSubscription({
      ...subscription,
      tier: stier,
    });
  };

  useEffect(() => {
    setTiers(subscriptionList[platformIndex].tiers);
  }, [platformIndex, subscriptionList]);

  return (
    <Fragment>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ alignSelf: "center" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Your Subscription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ textAlign: "center" }}>
              <TextField
                required
                disabled
                label="Platform"
                name="platform"
                value={subscription.platform}
              ></TextField>
              <TextField
                required
                select
                label="Tier"
                name="tier"
                value={subscription.tier}
                onChange={OnTierChange}
                helperText="Select a tier of subscription"
              >
                {tiers.length > 0
                  ? tiers.map((option) => (
                      <MenuItem key={option.tier + "id"} value={option.tier}>
                        {option.tier}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
              <TextField
                id="date"
                label="Date subscribed"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateSubscribed"
                value={subscription.dateSubscribed}
                onChange={onDataHandler}
              />

              <TextField
                required
                id="outlined-required"
                label="Price"
                name="amount"
                value={subscription.amount}
                onChange={onDataHandler}
              />
            </div>
          </Box>
        </Modal.Body>
        <Modal.Footer style={{ alignSelf: "center" }}>
          <FormControlLabel
            control={
              <Switch
                name="recurring"
                checked={subscription.recurring}
                onChange={(e) => {
                  setSubscription({
                    ...subscription,
                    recurring: e.target.checked,
                  });
                }}
                value={subscription.recurring}
              />
            }
            label="Recurring"
          />
          <Button className="actionBtn" onClick={handleUpdateBtn}>
            Submit
          </Button>
          <Button onClick={props.onHide} className="actionBtn">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
