import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import validator from "validator";
import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
const axios = require("axios").default;

export default function CreateAccount() {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    // Set key value pairs for user data to userData object to be used in the form
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      dateOfBirth: "2000-01-01",
      password: "",
      confirmPassword: "",
    });
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(userData);

    // Check if all fields are filled out
    if (
      !(
        userData.firstName.length > 0 &&
        userData.lastName.length > 0 &&
        userData.email.length > 0 &&
        userData.username.length > 0 &&
        userData.dateOfBirth.length > 0 &&
        userData.password.length > 0 &&
        userData.confirmPassword.length > 0
      )
    ) {
      enqueueSnackbar("Please fill out all fields", {
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    } else if (validator.isEmail(userData.email) === false) {
      enqueueSnackbar("Please enter a valid email", {
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    } else if (
      validator.equals(userData.password, userData.confirmPassword) === false
    ) {
      enqueueSnackbar("Passwords do not match", {
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    } else if (
      validator.matches(
        userData.password,
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ) === false
    ) {
      enqueueSnackbar(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
        {
          variant: "error",
        }
      );
      setIsSubmitting(false);
      return;
    }

    axios
      .post(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/user/register",
        userData
      )
      .then((res) => {
        setIsSubmitting(false);
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("token", "JWT " + res.data.token);
        navigate("/profile/userprofile", { replace: true });
        window.location.reload(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err.response.data);
        if (err.response.data.message === "User already exists") {
          enqueueSnackbar("User already exists", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        }
      });
  };

  const onDataHandler = (event) => {
    let target = event.target; //event, trigger gets reference to the current form element
    let name = target.name; //Name of field to be updated in state
    let value = target.value; //Value to be given when set/changed

    setUserData((userData) => {
      return { ...userData, [name]: value };
    });
  };

  if (userData)
    return (
      <div className="form_container">
        <form onSubmit={formSubmitHandler}>
          <h1>Register</h1>
          <p className="textBe">
            Would you like to manage all your subscriptions? Sign up now!
          </p>
          <div className="content">
            <Grid container spacing={1} columns={2}>
              <Grid item xs={1}>
                <div className="input_field">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userData.firstName}
                    onChange={onDataHandler}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className="input_field">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userData.lastName}
                    onChange={onDataHandler}
                  />
                </div>
              </Grid>
            </Grid>
            <div className="input_field">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={onDataHandler}
              />
            </div>
            <div className="input_field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={onDataHandler}
              />
            </div>
            <div className="input_field">
              <input
                type="date"
                name="dateOfBirth"
                defaultValue={userData.dateOfBirth}
                onChange={onDataHandler}
              />
            </div>
            <Grid container spacing={1} columns={2}>
              <Grid item xs={1}>
                <div className="input_field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={onDataHandler}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className="input_field">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={userData.confirmPassword}
                    onChange={onDataHandler}
                  />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="action">
            <button disabled={isSubmitting} type="submit">{`${
              isSubmitting ? "Creating Account" : "Create Account"
            }`}</button>
          </div>
          <div className="section_end"></div>
        </form>
      </div>
    );
  else return null;
}
