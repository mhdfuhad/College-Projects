import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "@aws-amplify/ui-react/styles.css";

import Auth from "./Auth";
import { getUser } from "./functions/auth";
import Fragment from "./Fragment";

async function init(user) {
  user = await getUser();
}

export default function Home() {
  const { authStatus, user, signOut } = useAuthenticator((context) => [
    context,
  ]);

  const [loggedIn, setLoggedIn] = useState(authStatus === "authenticated");
  const [login, setLogIn] = useState(""); // Used to render Auth component when sign in button is clicked

  useEffect(() => {
    if (authStatus === "authenticated") {
      setLoggedIn(true);
      setLogIn("");
      init(user);
    } else {
      setLoggedIn(false);
    }
  }, [authStatus, user]);

  return (
    <>
      {login === "login" ? (
        <Auth />
      ) : (
        <main>
          <Container fluid>
            <Row className="mt-5 text-center">
              <Col>
                <h1 className="mx-4">
                  Hello {loggedIn ? user.username : "Guest"}
                </h1>
                <button
                  className="mx-2 btn btn-primary"
                  disabled={loggedIn}
                  onClick={() => setLogIn("login")}
                >
                  Sign in
                </button>
                <button
                  className="mx-2 btn btn-primary"
                  disabled={!loggedIn}
                  onClick={signOut}
                >
                  Sign out
                </button>

                {loggedIn ? <Fragment /> : <></>}
              </Col>
            </Row>
          </Container>
        </main>
      )}
    </>
  );
}
