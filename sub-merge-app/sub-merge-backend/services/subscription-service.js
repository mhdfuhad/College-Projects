const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");
const { getReportData } = require("../utils/ReportFunctions");
const datefn = require("date-fns");

module.exports.addSubscription = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    User.findById(subscriptionData.userID)
      .then((user) => {
        if (
          user.subscribed &&
          user.subscribed.includes(subscriptionData.platform)
        ) {
          reject({
            status: 400,
            message: "User already subscribed to " + subscriptionData.platform,
          });
        } else if (user.subscribed.length >= user.subLimits) {
          reject({
            status: 400,
            message: "User has reached maximum subscription limit",
          });
        } else {
          Subscription.create(subscriptionData)
            .then((data) => {
              User.findByIdAndUpdate(
                subscriptionData.userID,
                {
                  $push: {
                    subscribed: data.platform,
                  },
                },
                { new: true }
              )
                .then((user) => {
                  resolve({
                    status: 201,
                    message:
                      "User for " + user._id + " registered " + data.platform,
                    subscriptionID: data._id,
                  });
                })
                .catch((err) => {
                  reject({
                    status: 500,
                    message: err.message,
                  });
                });
            })
            .catch((err) => {
              reject({
                status: 500,
                message: err.message,
              });
            });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.updateSubscription = (id, subscriptionData) => {
  return new Promise((resolve, reject) => {
    Subscription.findByIdAndUpdate(
      id,
      {
        $set: {
          recurring: subscriptionData.recurring,
          amount: subscriptionData.amount,
          dateSubscribed: subscriptionData.dateSubscribed,
          tier: subscriptionData.tier,
        },
      },
      { new: true }
    )
      .then((subscription) => {
        if (subscription) {
          resolve({
            status: 200,
            message: "Subscription updated",
            subscriptionData: subscription,
          });
        } else {
          reject({
            status: 404,
            message: "Subscription not found",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.getSubscription = (subID) => {
  return new Promise((resolve, reject) => {
    Subscription.findById(subID)
      .then((subscription) => {
        if (subscription) {
          const dates = [];
          var date = datefn.parseISO(subscription.dateSubscribed);

          while (datefn.isBefore(date, new Date())) {
            dates.push(datefn.format(date, "yyyy-MM-dd"));
            date = datefn.addMonths(date, 1);
          }

          resolve({
            status: 200,
            message: "Subscription found",
            subscriptionData: subscription,
            dates: dates,
          });
        } else {
          reject({
            status: 404,
            message: "Subscription not found",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.deleteSubscription = (subID, userID) => {
  return new Promise((resolve, reject) => {
    Subscription.findByIdAndDelete(subID)
      .then((subscription) => {
        if (subscription) {
          User.findByIdAndUpdate(
            userID,
            {
              $pull: {
                subscribed: subscription.platform,
              },
            },
            { new: true }
          )
            .then(() => {
              resolve({
                status: 200,
                message: "Subscription deleted",
              });
            })
            .catch((err) => {
              reject({
                status: 500,
                message: err.message,
              });
            });
        } else {
          reject({
            status: 404,
            message: "Subscription not found",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.listSubscriptions = (userID) => {
  return new Promise((resolve, reject) => {
    Subscription.find({ userID: userID })
      .then((subscriptions) => {
        if (subscriptions) {
          resolve({
            status: 200,
            message: "Subscriptions found",
            subscriptions: subscriptions,
          });
        } else {
          reject({
            status: 404,
            message: "Subscriptions not found",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.reportsSubscriptions = (userID) => {
  return new Promise((resolve, reject) => {
    Subscription.find({ userID: userID })
      .then((subscriptions) => {
        if (subscriptions.length > 0) {
          const data = getReportData(subscriptions);

          resolve({
            status: 200,
            message: "Subscriptions found",
            report: data,
          });
        } else {
          reject({
            status: 400,
            message: "No subscriptions found",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};
