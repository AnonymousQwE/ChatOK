import { AlternateEmail, Key, SavedSearch } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React from "react";

const RegisterUser = () => {
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
      <Typography variant="h3">Регистрация</Typography>
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
        <InputLabel htmlFor="password">Ваш пароль</InputLabel>
        <Input
          id="password"
          startAdornment={
            <InputAdornment position="start">
              <Key />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="username">Ваш UserName</InputLabel>
        <Input
          id="username"
          startAdornment={
            <InputAdornment position="start">
              <SavedSearch />
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
  );
};

export default RegisterUser;
