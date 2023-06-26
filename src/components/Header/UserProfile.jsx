import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Box,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { userActions } from "../../redux/user/userActions";
import {
  AccountCircle,
  AlternateEmail,
  Email,
  Key,
  LocalPhone,
  Person,
  Phone,
  SavedSearch,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import {
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  updatePassword,
} from "@firebase/auth";
import { auth } from "../../firebase-setting";

const emails = ["username@gmail.com", "user02@gmail.com"];

export default function UserProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Avatar
        sx={{ cursor: "pointer" }}
        alt={currentUser?.displayName}
        onClick={handleClickOpen}
        src={currentUser?.photoURL}
      />
      <UserProfileData user={currentUser} open={open} onClose={handleClose} />
    </div>
  );
}

function UserProfileData({ user, onClose, selectedValue, open }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      displayName: user.displayName,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    },
  });
  const onSubmit = (data, e) => {
    console.log(e);
    console.log(data);

    // dispatch({
    //   type: userActions.REGISTER_EMAIL_USER_SAGA,
    //   payload: data,
    // });
  };

  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={handleClose} open={open}>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt={user?.displayName}
            src={user?.photoURL}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{user?.displayName}</Typography>
            <Typography variant="body2">
              {"Дата регистрации "}
              {new Date(user?.createDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (user?.id) {
                  dispatch({ type: userActions.LOGOUT_USER_SAGA });
                }
                handleClose()
              }}
            >
              Выход
            </Button>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          Изменение профиля пользователя
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: 350,
              maxWidth: "80%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              margin: "10px auto",
            }}
          >
            <FormControl
              error={errors.displayName && true}
              margin="dense"
              fullWidth
              variant="standard"
            >
              <InputLabel htmlFor="DisplayName">Ваше Имя</InputLabel>
              <Input
                {...register("displayName", {
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
              <FormHelperText>{errors?.displayName?.message}</FormHelperText>
            </FormControl>
            <FormControl
              error={errors.userName && true}
              margin="dense"
              fullWidth
              variant="standard"
            >
              <InputLabel htmlFor="userName">
                Ваш UserName (для поиска)
              </InputLabel>
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
              error={errors.phoneNumber && true}
              margin="dense"
              fullWidth
              variant="standard"
            >
              <InputLabel htmlFor="phoneNumber">Ваш номер телефона</InputLabel>
              <Input
                {...register("phoneNumber", {
                  required: "Это поле обязательно для заполнения",
                })}
                id="phoneNumber"
                startAdornment={
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                }
              />
              <FormHelperText>{errors?.phoneNumber?.message}</FormHelperText>
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
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Отменить
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
}
