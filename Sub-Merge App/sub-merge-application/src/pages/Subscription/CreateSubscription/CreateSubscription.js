// React Library
import { useState, useContext } from "react";
import axios from "axios";

// Material UI
import { Modal, Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { UserDataContext } from "../../../context/userDataContext";
import Switch from "@mui/material/Switch";
import { useSnackbar } from "notistack";

// Components
import { SubscriptionData } from "../SubscriptionData";

export default function CreateSubscription(props) {
  const { userData } = useContext(UserDataContext);
  const { enqueueSnackbar } = useSnackbar();
  const subscriptionList = SubscriptionData;
  const [tiers, setTiers] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [subscription, setSubscription] = useState({
    platform: "",
    dateSubscribed: new Date().toISOString().split("T")[0],
    amount: "",
    recurring: false,
    tier: "",
  });

  const addSubsBtnHandler = () => {
    if (
      subscription.platform &&
      subscription.tier &&
      subscription.amount &&
      subscription.dateSubscribed
    ) {
      axios
        .post(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/subscription/add",
          {
            userID: localStorage.getItem("id"),
            platform: subscriptionList[selectedPlatform].platform,
            tier: subscription.tier,
            amount: subscription.amount,
            recurring: subscription.recurring,
            dateSubscribed: subscription.dateSubscribed,
            img: subscriptionList[selectedPlatform].img,
            logo: subscriptionList[selectedPlatform].logo,
            category: subscriptionList[selectedPlatform].category,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          enqueueSnackbar("Subscription added successfully", {
            variant: "success",
          });
          props.onHide();
          window.location.reload();
        })
        .catch((err) => {
          props.onHide();
          if (
            err.response.data.message ===
            "User already subscribed to " +
              subscriptionList[selectedPlatform].platform
          ) {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
            return;
          } else if (
            err.response.data.message ===
            "User has reached maximum subscription limit"
          ) {
            enqueueSnackbar(
              "User has reached the maximum subscription limit of " +
                userData.subLimits +
                ", please upgrade to add more subscriptions.",
              {
                variant: "warning",
              }
            );
            return;
          }
          console.log(err.response.data);
          enqueueSnackbar("Error adding subscription", {
            variant: "error",
          });
        });
    } else {
      enqueueSnackbar("Please fill out all fields", { variant: "warning" });
    }
  };

  const OnPlatformChange = (e) => {
    let platform = e.target.value;
    subscription.tier = "";
    subscription.amount = "";
    setSelectedPlatform(platform - 1);

    setTiers(subscriptionList[platform - 1].tiers);

    setSubscription({
      ...subscription,
      platform: platform,
    });
  };

  const OnTierChange = (e) => {
    let stier = e.target.value;
    subscriptionList[selectedPlatform].tiers.forEach((tier) => {
      if (tier.tier === stier) {
        subscription.amount = tier.price;
      }
    });
    setSubscription({
      ...subscription,
      tier: stier,
    });
  };

  const onDataHandler = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    setSubscription((prevSub) => {
      return { ...subscription, [name]: value };
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ alignSelf: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Subscription
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
              select
              label="Platform"
              name="platform"
              value={subscription.platform}
              onChange={OnPlatformChange}
              helperText="Select a platform"
            >
              {subscriptionList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.platform}
                </MenuItem>
              ))}
            </TextField>
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
        <Button onClick={addSubsBtnHandler} className="actionBtn">
          Add subscription
        </Button>
        <Button onClick={props.onHide} className="actionBtn">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
