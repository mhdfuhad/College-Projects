import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
export default function Logo({ xs, md, link }) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        href={link || "/"}
        component="a"
        sx={{
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            color: "#ffffff",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <img src="../logo.jpg" alt="Logo" width={50} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: `${xs}`, md: `${md}` },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              color: "#ffffff",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          Sub-Merge
        </Typography>
      </Stack>
    </>
  );
}
