import React, { useState } from "react";
import LoginUser from "./LoginUser";
import { Grid } from "@mui/material";
import RegisterUser from "./RegisterUser";

const Auth = () => {
  const [reg, setReg] = useState(false);
  return (
    <Grid
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
      container
    >
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingX: 8,
        }}
        xs={3}
      >
        {reg ? <RegisterUser setReg={setReg} /> : <LoginUser setReg={setReg} />}
      </Grid>
    </Grid>
  );
};

export default Auth;
