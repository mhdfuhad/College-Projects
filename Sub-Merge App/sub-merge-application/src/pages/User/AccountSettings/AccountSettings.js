import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SideBar from "../../../components/SideBar/Sidebar";
import { UserDataContext } from "../../../context/userDataContext";

import "./AccountSettings.css";

export default function AccountSettings(props) {
  const { userData } = useContext(UserDataContext);

  if (userData) {
    return (
      <div className="UserProfile d-flex">
        <SideBar firstName={userData.firstName} lastName={userData.lastName} />
        <div
          className="main-content"
          id="tabbedRoutes"
          style={{ overflowY: "auto" }}
        >
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Spinner animation="border" variant="primary" />;
  }
}
