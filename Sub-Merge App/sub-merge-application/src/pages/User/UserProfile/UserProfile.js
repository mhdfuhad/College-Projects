import { UserDataContext } from "../../../context/userDataContext";
import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  CloseButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { useSnackbar } from "notistack";
import "./UserProfile.css";
import validator from "validator";
const axios = require("axios").default;

export default function UserProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const { userData, setUserData } = useContext(UserDataContext);
  const [userDataCopy, setUserDataCopy] = useState({
    ...userData,
  }); // copy of userdata to be shown in case the update backend request fails (e.g. due to network error)
  const [edit, setEdit] = useState(true);
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);
  const [userPass, setUserPass] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const interestsList = [
    "Art",
    "Culture",
    "Design",
    "Film",
    "Food",
    "Games",
    "Music",
    "Photography",
    "Publishing",
    "Technology",
    "Theatre",
  ];

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/user/interests/" +
          localStorage.getItem("id"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setInterests(res.data.interests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    if (edit === false) {
      setUserData(userDataCopy);
      window.location.reload(false);
    }
    setEdit(!edit);
  };

  const UpdateHandler = (e) => {
    e.preventDefault();
    if (
      userData.firstName === "" ||
      userData.lastName === "" ||
      userData.email === ""
    ) {
      enqueueSnackbar("Please fill in all fields", {
        variant: "warning",
      });
      return;
    } else if (validator.isEmail(userData.email) === false) {
      enqueueSnackbar("Invalid email", { variant: "warning" });
      return;
    } else if (
      userData.firstName === userDataCopy.firstName &&
      userData.lastName === userDataCopy.lastName &&
      userData.email === userDataCopy.email
    ) {
      setEdit(!edit);
      enqueueSnackbar("No changes made", { variant: "warning" });
      return;
    } else {
      axios
        .put(
          process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
            "api/user/profile/" +
            localStorage.getItem("id"),
          userData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          enqueueSnackbar("Profile updated successfully", {
            variant: "success",
          });
          setUserData(res.data.user);
          setUserDataCopy(res.data.user);
        })
        .catch((err) => {
          setUserData(userDataCopy);
          enqueueSnackbar("Profile update failed", {
            variant: "error",
          });
          console.log(err);
        });
    }
    setEdit(!edit);
  };

  const ChangePasswordHandler = (e) => {
    e.preventDefault();
    if (
      userPass.currentPassword === "" ||
      userPass.newPassword === "" ||
      userPass.confirmPassword === ""
    ) {
      enqueueSnackbar("Please fill in all fields", {
        variant: "warning",
      });
      return;
    }
    if (userPass.newPassword !== userPass.confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "warning",
      });
      return;
    }

    if (
      validator.matches(
        userPass.newPassword,
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ) === false
    ) {
      enqueueSnackbar(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and at least 8 characters long",
        {
          variant: "warning",
        }
      );
      return;
    }

    axios
      .put(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/user/password/" +
          localStorage.getItem("id"),
        {
          currpassword: userPass.currentPassword,
          password: userPass.newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setUserPass({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        window.location.reload(false);
        enqueueSnackbar("Password updated successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        setUserPass({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        if (err.response.data.message === "Invalid password") {
          enqueueSnackbar("Incorrect password", {
            variant: "warning",
          });
          return;
        }

        enqueueSnackbar("Password update failed", {
          variant: "error",
        });
        console.log(err.response.data);
      });
  };

  // All the interest related handlers
  const AddInterestHandler = (e) => {
    e.preventDefault();

    if (interest === "") {
      enqueueSnackbar("Please select an interest", { variant: "warning" });
      return;
    }

    if (interests.includes(interest)) {
      enqueueSnackbar("You already have this interest", { variant: "info" });
      return;
    }

    axios
      .put(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/user/interests/" +
          localStorage.getItem("id"),
        {
          interest: interest,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        enqueueSnackbar("Interest added", { variant: "success" });
        setInterests(res.data.interests);
      })
      .catch((err) => {
        if (err.response.data.message === "Interest already exists") {
          enqueueSnackbar("You already have this interest", {
            variant: "error",
          });
          return;
        }
        enqueueSnackbar("Error adding interest", { variant: "error" });
        console.log(err);
      });
    setInterest("");
  };

  const handleRemoveInterest = (interest) => {
    axios
      .delete(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/user/interests/" +
          localStorage.getItem("id"),

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          data: {
            interest: interest,
          },
        }
      )
      .then((res) => {
        enqueueSnackbar("Interest removed", { variant: "info" });
        setInterests(res.data.interests);
      })
      .catch((err) => {
        enqueueSnackbar("Error removing interest", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="container-fluid mt-3">
      <Row>
        <Col md={8}>
          <h4 className="text-center">Update Profile</h4>
          <Form>
            <fieldset disabled={edit}>
              <Form.Group className="m-3">
                <Row>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      defaultValue={userData.firstName}
                      onChange={(e) => (userData.firstName = e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      defaultValue={userData.lastName}
                      onChange={(e) => (userData.lastName = e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={userData.email}
                  onChange={(e) => (userData.email = e.target.value)}
                />
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  defaultValue={userData.username}
                  disabled
                  readOnly
                />
                <Form.Text className="text-muted">
                  Username cannot be updated.
                </Form.Text>
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={userData.dateOfBirth}
                  disabled
                  readOnly
                />
                <Form.Text className="text-muted">
                  Date of Birth cannot be updated, to update it please contact
                  support.
                </Form.Text>
              </Form.Group>
            </fieldset>
            <Row className="text-center mt-3">
              <Col>
                <div className="d-grid gap-2 mx-1">
                  <Button
                    variant="primary"
                    type="submit"
                    className="m-2"
                    onClick={UpdateHandler}
                    disabled={edit}
                    size="lg"
                  >
                    Update
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-grid gap-2 mx-1">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="m-2"
                    onClick={handleEdit}
                    size="lg"
                  >
                    {edit ? "Edit" : "Cancel"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={4} className="text-center">
          <div>
            <h4 className="mb-5"> Interests </h4>
            <ListGroup>
              {interests !== null
                ? interests.map((interest) => (
                    <ListGroup.Item className="mx-3" key={interest + "id"}>
                      <Row>
                        <Col sm={10}>{interest}</Col>
                        <Col className="p-0" sm={2}>
                          <CloseButton
                            onClick={() => handleRemoveInterest(interest)}
                          ></CloseButton>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                : null}
            </ListGroup>
            <Row className="mx-1 mt-2">
              <Dropdown as={ButtonGroup}>
                <Col sm={10}>
                  <div className="d-grid gap-2">
                    <Button
                      variant="success"
                      size="lg"
                      onClick={AddInterestHandler}
                    >
                      Add Interest
                    </Button>
                  </div>
                </Col>
                <Col sm={2}>
                  <div className="d-grid gap-2">
                    <Dropdown.Toggle
                      split
                      variant="success"
                      size="lg"
                      id="dropdown-split-basic"
                    />
                  </div>
                </Col>
                <Dropdown.Menu>
                  {interestsList.map((interest) => (
                    <Dropdown.Item
                      key={interest + "id2"}
                      onClick={() => setInterest(interest)}
                    >
                      {interest}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={8}>
          <div>
            <h4 className="text-center">Change Password</h4>
            <Form>
              <Form.Group className="m-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Current Password"
                  onChange={(e) => (userPass.currentPassword = e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="m-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      onChange={(e) => (userPass.newPassword = e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="m-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        (userPass.confirmPassword = e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="text-center mt-3">
                <Col>
                  <div className="d-grid gap-2 mx-1">
                    <Button
                      variant="primary"
                      type="submit"
                      className="m-2"
                      onClick={ChangePasswordHandler}
                      size="lg"
                    >
                      Change Password
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
