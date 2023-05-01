import {
  AlternateEmail,
  Key,
  Person,
  SavedSearch,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { userActions } from "../../redux/user/userActions";

const RegisterUser = ({ setReg }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data, e) => {
    console.log(e);
    dispatch({
      type: userActions.REGISTER_USER_SAGA,
      payload: data,
    });
  };
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h3">Регистрация</Typography>
        <FormControl
          error={errors.dislayName && true}
          margin="dense"
          fullWidth
          variant="standard"
        >
          <InputLabel htmlFor="DisplayName">Ваше Имя</InputLabel>
          <Input
            {...register("dislayName", {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: 4,
                message: "Минимальное колличество знаков 4",
              },
            })}
            id="DisplayName"
            startAdornment={
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            }
          />
          <FormHelperText>{errors?.dislayName?.message}</FormHelperText>
        </FormControl>
        <FormControl
          error={errors.userName && true}
          margin="dense"
          fullWidth
          variant="standard"
        >
          <InputLabel htmlFor="userName">Ваш UserName (для поиска)</InputLabel>
          <Input
            {...register("userName", {
              required: "Это поле обязательно для заполнения",
            })}
            id="userName"
            startAdornment={
              <InputAdornment position="start">
                <SavedSearch />
              </InputAdornment>
            }
          />
          <FormHelperText>{errors?.userName?.message}</FormHelperText>
        </FormControl>
        <FormControl
          error={errors.email ? true : false}
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
        <FormControl
          error={errors.password2 && true}
          margin="dense"
          fullWidth
          variant="standard"
        >
          <InputLabel htmlFor="password2">Повторите пароль</InputLabel>
          <Input
            {...register("password2", {
              required: "Поле обязательное для заполнения",
              minLength: { value: 8, message: "Минимально 8 символов" },
            })}
            id="password2"
            type={showPassword2 ? "text" : "password"}
            startAdornment={
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword2((show) => !show)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errors?.password2?.message}</FormHelperText>
        </FormControl>
        <Button
          // onClick={() => {
          //   dispatch({
          //     type: userActions.REGISTER_USER_SAGA,
          //     payload: { email: "123asd@asd.ru", password: "asdasdasd" },
          //   });
          // }}
          variant="contained"
          type="submit"
        >
          Зарегистрироваться
        </Button>
        <Typography variant="subtitle1">
          Уже есть аккаунт?{" "}
          <Link
            onClick={(e) => {
              e.preventDefault();
              setReg(false);
            }}
            href={""}
          >
            Войти
          </Link>
        </Typography>
        {errors && console.log(errors)}
      </form>
    </>
  );
};

export default RegisterUser;
