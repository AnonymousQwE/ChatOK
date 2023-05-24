import React from "react";
import "./loader.css";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className="loader"></span>
    </Box>
  );
};

export default Loader;
