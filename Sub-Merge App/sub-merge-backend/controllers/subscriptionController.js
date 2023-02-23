const express = require("express");
const router = express.Router();
const subscriptionService = require("../services/subscription-service");

router.get("/get/:id", async (req, res) => {
  try {
    await subscriptionService.getSubscription(req.params.id).then((result) => {
      res.status(result.status).json({
        message: result.message,
        subscription: result.subscriptionData,
        dates: result.dates,
      });
    });
  } catch (err) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    await subscriptionService.addSubscription(req.body).then((result) => {
      res.status(result.status).json({
        message: result.message,
        subscriptionID: result.subscriptionID,
      });
    });
  } catch (err) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await subscriptionService
      .updateSubscription(req.params.id, req.body)
      .then((subscription) => {
        res.status(subscription.status).json({
          message: subscription.message,
          subscription: subscription.subscriptionData,
        });
      });
  } catch (err) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await subscriptionService
      .deleteSubscription(req.params.id, req.body.userID)
      .then((subscription) => {
        res.status(subscription.status).json({
          message: subscription.message,
          status: 202,
        });
      });
  } catch (err) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    await subscriptionService
      .listSubscriptions(req.params.id)
      .then((result) => {
        res.status(result.status).json({
          message: result.message,
          subscriptions: result.subscriptions,
        });
      });
  } catch (err) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }
});

router.get("/report/:id", async (req, res) => {
  try {
    await subscriptionService
      .reportsSubscriptions(req.params.id)
      .then((result) => {
        res.status(result.status).json({
          message: result.message,
          report: result.report,
        });
      });
  } catch (err) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
