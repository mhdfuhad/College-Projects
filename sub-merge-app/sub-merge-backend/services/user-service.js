const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Below go the functions that can be used to do operations on user data in the database
// Always add a catch to the end of the promise chain to handle errors as if there is no catch the error will be thrown and the server will crash

module.exports.RegisterUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: userData.email })
      .then((user) => {
        if (user) {
          reject({
            status: 400,
            message: "User already exists",
          });
        } else {
          User.create(userData)
            .then((user) => {
              resolve({
                status: 201,
                message: "User for " + user.email + " created",
                _id: user._id,
                email: user.email,
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

module.exports.LoginUser = async (userData) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: userData.email })
      .then((user) => {
        if (user) {
          bcrypt.compare(userData.password, user.password).then((res) => {
            if (res) {
              resolve({
                status: 200,
                message: user.username + " logged in",
                _id: user._id,
                email: user.email,
              });
            } else {
              reject({
                status: 401,
                message: "Invalid password",
              });
            }
          });
        } else {
          reject({
            status: 400,
            message: "Invalid email or password",
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

module.exports.deleteUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete({ _id: userData.id }, (err, result) => {
      if (err) {
        reject({
          status: 404,
          message: "unable to find the user. please try again",
          err,
        });
      }
      resolve({
        status: 202,
        message: "successfully deleted the user",
        result,
      });
    });
  });
};

module.exports.GetUser = (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        if (user) {
          resolve({
            status: 200,
            message: user.username + " found",
            userData: {
              _id: user._id,
              email: user.email,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              dateOfBirth: user.dateOfBirth,
              subLimits: user.subLimits,
              tier: user.tier,
              friends: user.friends,
            },
          });
        } else {
          reject({
            status: 404,
            message: "User not found",
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

module.exports.AddFriend = (userId, friendEmail) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        if (user) {
          User.findOne({ email: friendEmail })
            .then((friend) => {
              if (friend) {
                if (user.friends.includes(friend._id)) {
                  reject({
                    status: 400,
                    message: "User already friends",
                  });
                } else {
                  User.findByIdAndUpdate(userId, {
                    $push: { friends: friend._id },
                  })
                    .then(() => {
                      User.findByIdAndUpdate(friend._id, {
                        $push: { friends: user._id },
                      }).then(() => {
                        resolve({
                          status: 200,
                          message: "Friend added",
                          userData: {
                            _id: friend._id,
                            name: friend.firstName + " " + friend.lastName,
                            username: friend.username,
                          },
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
              } else {
                reject({
                  status: 404,
                  message: "User does not exist",
                });
              }
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
            message: "User not found",
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

module.exports.RemoveFriend = (userId, friendId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        if (user) {
          User.findById(friendId)
            .then((friend) => {
              if (friend) {
                if (!user.friends.includes(friend._id)) {
                  reject({
                    status: 400,
                    message: "User not friends",
                  });
                } else {
                  User.findByIdAndUpdate(userId, {
                    $pull: { friends: friend._id },
                  }).then(() => {
                    User.findByIdAndUpdate(friendId, {
                      $pull: { friends: user._id },
                    })
                      .then(() => {
                        resolve({
                          status: 200,
                          message: "Friend removed",
                        });
                      })
                      .catch((err) => {
                        reject({
                          status: 500,
                          message: err.message,
                        });
                      });
                  });
                }
              } else {
                reject({
                  status: 404,
                  message: "Friend not found",
                });
              }
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
            message: "User not found",
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

module.exports.UpdateUserProfile = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const { firstName, lastName, email } = req.body;

      User.findByIdAndUpdate(
        req.params.id,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        { new: true }
      )
        .then((user) => {
          resolve({
            status: 200,
            message: "User updated",
            userData: {
              email: user.email,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              dateOfBirth: user.dateOfBirth,
            },
          });
        })
        .catch((err) => {
          reject({
            status: 500,
            message: err.message,
          });
        });
    } catch (error) {
      reject({
        status: 500,
        message: error.message,
      });
    }
  });
};

module.exports.UpdateUserPassword = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const { currpassword, password } = req.body;

      User.findById(req.params.id)
        .then((user) => {
          bcrypt.compare(currpassword, user.password).then((res) => {
            if (res) {
              bcrypt.hash(password, 10).then((hash) => {
                User.findByIdAndUpdate(
                  req.params.id,
                  {
                    password: hash,
                  },
                  { new: true }
                )
                  .then(() => {
                    resolve({
                      status: 200,
                      message: "User password updated",
                    });
                  })
                  .catch((err) => {
                    reject({
                      status: 500,
                      message: err.message,
                    });
                  });
              });
            } else {
              reject({
                status: 401,
                message: "Invalid password",
              });
            }
          });
        })
        .catch((err) => {
          reject({
            status: 500,
            message: err.message,
          });
        });
    } catch (error) {
      reject({
        status: 500,
        message: error.message,
      });
    }
  });
};

module.exports.GetUserInterests = (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        if (user) {
          resolve({
            status: 200,
            message: "User interests found",
            interests: user.interests || [],
          });
        } else {
          reject({
            status: 404,
            message: "User not found",
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

module.exports.AddUserInterest = (userId, interest) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        if (user) {
          user.interests.forEach((element) => {
            element === interest
              ? reject({
                  status: 400,
                  message: "Interest already exists",
                })
              : null;
          });
        } else {
          reject({
            status: 404,
            message: "User not found",
          });
        }
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });

    User.findByIdAndUpdate(
      userId,
      {
        $push: {
          interests: interest,
        },
      },
      { new: true }
    )
      .then((user) => {
        resolve({
          status: 200,
          message: "Interest added",
          interests: user.interests || [],
        });
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.RemoveUserInterest = (userId, interest) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          interests: interest,
        },
      },
      { new: true }
    )
      .then((user) => {
        resolve({
          status: 200,
          message: "Interest removed",
          interests: user.interests || [],
        });
      })
      .catch((err) => {
        reject({
          status: 500,
          message: err.message,
        });
      });
  });
};

module.exports.updateLimit = (req) => {
  return new Promise((resolve, reject) => {
    const userID = req.params.id;

    User.findById(userID)
      .then((user) => {
        if (user) {
          if (user.tier === "Free") {
            reject({
              status: 401,
              message: "User is not paid",
            });
          } else if (user.tier === "Premium") {
            User.findByIdAndUpdate(
              userID,
              {
                $set: {
                  subLimits: 25,
                },
              },
              { new: true }
            )
              .then((res) => {
                resolve({
                  status: 200,
                  message: "Limit updated",
                  subLimits: res.subLimits,
                });
              })
              .catch((err) => {
                reject({
                  status: 500,
                  message: err.message,
                });
              });
          } else if (user.tier === "Pro") {
            User.findByIdAndUpdate(
              userID,
              {
                $set: {
                  subLimits: 100,
                },
              },
              { new: true }
            )
              .then((res) => {
                resolve({
                  status: 200,
                  message: "Limit updated",
                  subLimits: res.subLimits,
                });
              })
              .catch((err) => {
                reject({
                  status: 500,
                  message: err.message,
                });
              });
          }
        } else {
          reject({
            status: 404,
            message: "User not found",
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

module.exports.GetUserSubscribed = (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        if (user) {
          resolve({
            status: 200,
            message: "User subscribed found",
            subscribed: user.subscribed || [],
          });
        } else {
          reject({
            status: 404,
            message: "User not found",
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
