import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Authenticator } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Authenticator.Provider>
    <App />
  </Authenticator.Provider>
);
