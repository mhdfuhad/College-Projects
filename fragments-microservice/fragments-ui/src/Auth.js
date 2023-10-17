import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { config } from "./functions/auth";
import Home from "./Home";

Amplify.configure(config);

const formFields = {
  signUp: {
    name: {
      order: 1,
    },
    email: {
      order: 2,
    },
    username: {
      order: 3,
    },
    password: {
      order: 4,
    },
    confirm_password: {
      order: 5,
    },
  },
};

export default function Auth() {
  return (
    <Authenticator
      signUpAttributes={["name", "email"]}
      formFields={formFields}
      variation="modal"
    >
      {() => <Home />}
    </Authenticator>
  );
}
