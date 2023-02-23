import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import validator from "validator";
const axios = require("axios").default;

export default function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    // Set key value pairs for user data to userData object to be used in the form
    setUserData({
      email: "",
      password: "",
    });
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (userData.email === "" || userData.password === "") {
      enqueueSnackbar("Please fill out all fields", { variant: "error" });
      setIsSubmitting(false);
    } else if (validator.isEmail(userData.email) === false) {
      enqueueSnackbar("Please enter a valid email", { variant: "error" });
      setIsSubmitting(false);
    } else {
      if (userData.email.length > 0 && userData.password.length > 0) {
        axios
          .post(
            process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/user/login",
            userData
          )
          .then((res) => {
            setIsSubmitting(false);
            localStorage.setItem("id", res.data._id);
            localStorage.setItem("token", "JWT " + res.data.token);
            navigate("/dashboard", { replace: true });
            window.location.reload(false);
          })
          .catch((err) => {
            setIsSubmitting(false);
            if (err.response.data.message === "Invalid password") {
              enqueueSnackbar("Invalid password", {
                variant: "error",
              });
            } else if (
              err.response.data.message === "Invalid email or password"
            ) {
              enqueueSnackbar("Invalid email or password", {
                variant: "error",
              });
            } else {
              enqueueSnackbar("Something went wrong", {
                variant: "error",
              });
            }
          });
      }
    }
  };

  const onDataHandler = (event) => {
    let target = event.target; // Event, trigger gets reference to the current form element
    let name = target.name; // Name of field to be updated in state
    let value = target.value; // Value to be given when set/changed

    setUserData((userData) => {
      return { ...userData, [name]: value };
    });
  };

  if (userData)
    return (
      <div className="form_container">
        <form onSubmit={formSubmitHandler}>
          <h1>Login</h1>
          <p className="textBe">Already have an account? Log in below.</p>
          <div className="content">
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
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={onDataHandler}
              />
            </div>
          </div>

          <div className="action">
            <button disabled={isSubmitting} type="submit">{`${
              isSubmitting ? "Signing In" : "Sign In"
            }`}</button>
          </div>

          <div className="section_end"></div>
        </form>
      </div>
    );
  else return null;
}
