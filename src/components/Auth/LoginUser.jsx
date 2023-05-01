import { AccountCircle, AlternateEmail, Key } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoginUser = ({ setReg }) => {
  return (
    <>
      <Typography variant="h3">Авторизация</Typography>
      <FormControl fullWidth variant="standard">
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
      <FormControl fullWidth variant="standard">
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
      <Button variant="contained">Войти</Button>
      <Typography variant="p">
        Еще нет аккаунта?{" "}
        <Link
          onClick={(e) => {
            e.preventDefault();
            setReg(true);
          }}
          href={""}
        >
          Зарегистрироваться
        </Link>
      </Typography>
    </>
  );
};

export default LoginUser;
