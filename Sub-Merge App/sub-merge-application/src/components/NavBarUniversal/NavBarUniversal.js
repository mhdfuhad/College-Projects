import { useContext, useState } from "react";
import { UserDataContext } from "../../context/userDataContext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "./Logo";
import MenuBar from "./MenuBar";
import NavBarPages from "./NavBarPages";
import NavBarAccountSettings from "./NavBarAccountSettings";

export default function NavBarUniversal(props) {
  const { userData } = useContext(UserDataContext);
  const [loggedIn] = useState(localStorage.getItem("token") !== null);
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.reload();
  };

  return userData ? (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#3b4146" }}>
        <Container maxWidth="xll" sx={{ mr: 5 }}>
          <Toolbar disableGutters>
            <Logo xs="none" md="flex" link="/dashboard" />

            {/* The menu bar only displays when the screen shrinks */}
            <MenuBar
              pages={["Subscriptions", "Entertainment", "Communication"]}
            />

            <NavBarPages
              pages={["Subscriptions", "Entertainment", "Communication"]}
            />
            <NavBarAccountSettings
              userFirstName={userData.firstName}
              logout={Logout}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  ) : (
    <>
      {loggedIn ? null : (
        <AppBar position="sticky" sx={{ backgroundColor: "#3b4146" }}>
          <Container maxWidth="xll">
            <Toolbar disableGutters>
              <Logo />
              <NavBarPages
                pages={["Subscriptions", "Entertainment", "Communication"]}
              />
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
