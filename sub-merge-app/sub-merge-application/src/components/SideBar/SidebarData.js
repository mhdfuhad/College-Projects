import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

/* 
  This file is used to store sidebar item and its according route. 
  Note: Define all routes of sidebar items in App.js file under the UserProfile component to create nested routes.
*/

export const SidebarData = [
  {
    title: "User Profile",
    icon: <ManageAccountsIcon />,
    link: "/userprofile",
  },
  {
    title: "Delete Account",
    icon: <DeleteIcon />,
    link: "/deleteaccount",
  },
];
