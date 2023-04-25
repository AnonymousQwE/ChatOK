import { AccountCircle, AlternateEmail, Key } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const LoginUser = () => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      xs={3}
    >
      <Typography variant="h3">Авторизация</Typography>
      <FormControl variant="standard">
        <InputLabel htmlFor="email">Ваш Email</InputLabel>
        <Input
          id="email"
          startAdornment={
            <InputAdornment position="start">
              <AlternateEmail />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="email">Ваш пароль</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Key />
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
  );
};

export default LoginUser;
