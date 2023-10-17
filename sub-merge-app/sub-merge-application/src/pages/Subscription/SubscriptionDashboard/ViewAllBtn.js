// React Library
import { useNavigate } from "react-router-dom";

// Material UI
import { Box } from "@mui/system";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ViewAllBtn() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        backgroundColor: "#22C55E",
        borderRadius: "10%",
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Stack
        direction="column"
        style={{
          alignItems: "center",
          paddingTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/subscription/all")}
      >
        <GridViewOutlinedIcon fontSize="large" style={{ color: "#ffffff" }} />
        <Button style={{ color: "#ffffff" }}>View All</Button>
      </Stack>
    </Box>
  );
}
