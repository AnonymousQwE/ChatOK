import {
  AccountCircle,
  AlternateEmail,
  Key,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/user/userActions";
import isEmail from "validator/lib/isEmail";

const LoginUser = ({ setReg }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data, e) => {
    dispatch({
      type: userActions.LOGIN_EMAIL_USER_SAGA,
      payload: data,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h3">Авторизация</Typography>
        <FormControl
          error={errors.email && true}
          margin="dense"
          fullWidth
          variant="standard"
        >
          <InputLabel htmlFor="email">Ваш Email</InputLabel>
          <Input
            {...register("email", {
              required: "Это поле обязательно для заполнения",
              validate: (input) =>
                isEmail(input) ||
                "Некоректная почта, проверьте правильность email",
            })}
            id="email"
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>
            }
          />
          <FormHelperText>{errors?.email?.message}</FormHelperText>
        </FormControl>
        <FormControl
          error={errors.password && true}
          margin="dense"
          fullWidth
          variant="standard"
        >
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input
            {...register("password", {
              required: "Поле обязательное для заполнения",
              minLength: { value: 8, message: "Минимально 8 символов" },
            })}
            id="password"
            type={showPassword ? "text" : "password"}
            startAdornment={
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errors?.password?.message}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained">
          Войти
        </Button>
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
      </form>
    </>
  );
};

export default LoginUser;
