import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/user/userActions";

export default function Test() {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          gap: 2,
          margin: "10px auto",
        }}
      >
        <Typography>{JSON.stringify(user.id)}</Typography>
        <Button
          onClick={() => {
            dispatch({ type: userActions.LOGIN_USER_SAGA });
          }}
          variant="contained"
        >
          Авторизоваться через ГУГЛ
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: userActions.CHECK_USER_SAGA });
          }}
          variant="contained"
        >
          Проверить юзера
        </Button>
        <Button
          onClick={() => dispatch({ type: userActions.LOGOUT_USER_SAGA })}
          variant="contained"
        >
          {" "}
          Выйти из юзера
        </Button>
      </Box>
    </div>
  );
}
