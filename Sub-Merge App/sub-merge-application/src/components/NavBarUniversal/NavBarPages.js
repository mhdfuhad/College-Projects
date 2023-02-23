import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function NavBarPages({ pages }) {
  const [loggedIn] = useState(localStorage.getItem("token") !== null);
  const navigate = useNavigate();

  const handleOnClick = (index) => {
    return (event) => {
      switch (index) {
        case 0:
          if (loggedIn) {
            navigate("/subscription");
            break;
          }
          navigate("/subscription/page");
          break;
        case 1:
          if (loggedIn) {
            navigate("/entertainment");
            break;
          }
          navigate("/entertainment/page");
          break;
        case 2:
          if (loggedIn) {
            navigate("/communication");
            break;
          }
          navigate("/communication/page");
          break;
        default:
      }
    };
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page, index) => (
        <Button
          key={index}
          onClick={handleOnClick(index)}
          sx={{
            color: "white",
            textTransform: "none",
            fontSize: "1rem",

            "&:hover": {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          {page}
        </Button>
      ))}
      {!loggedIn && (
        <Button
          sx={{
            position: "absolute",
            right: "3rem",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",

            "&:hover": {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          onClick={() => navigate("/login")}
        >
          Login/Register
        </Button>
      )}{" "}
    </Box>
  );
}
