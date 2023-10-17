import { Fragment } from "react";

export default function SidebarContentContainer(props) {
  return (
    <Fragment>
      <div className="sidebar-content-header">{props.header}</div>
      <hr
        style={{
          background: "grey",
          color: "grey",
          borderColor: "grey",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      />
      {props.component}
    </Fragment>
  );
}
