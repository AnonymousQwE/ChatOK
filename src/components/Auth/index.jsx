import React from "react";
import LoginUser from "./LoginUser";
import { Grid } from "@mui/material";
import RegisterUser from "./RegisterUser";

const Auth = () => {
  return (
    <Grid
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
      container
    >
      <RegisterUser />
    </Grid>
  );
};

export default Auth;
