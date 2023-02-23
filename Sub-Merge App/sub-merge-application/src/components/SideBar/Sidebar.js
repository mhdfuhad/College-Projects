import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SideBar(props) {
  return (
    <div className="Sidebar">
      <div className="welcomeAvatar">
        <div id="avatarIcon">
          <AccountCircleIcon />
        </div>
        <div id="avatarFullName">
          {props.firstName} {props.lastName}
        </div>
      </div>
      <hr
        style={{
          background: "grey",
          color: "grey",
          borderColor: "grey",
          height: "2px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      />
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="sidebarRow"
              onClick={() => {
                window.location.pathname = "/profile" + val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
      <div className="logoutSidebarContainer">
        <a
          href="/"
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <div id="logoutIconSidebar">
            <LogoutIcon />
          </div>
          <div id="logoutSidebar">Log out</div>
        </a>
      </div>
    </div>
  );
}
