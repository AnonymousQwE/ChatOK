import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import UserProfile from "../DialogUserProfile";
import { setDialogUser } from "../../redux/slices/chatSlice";
import { useDispatch } from "react-redux";

export default function ChatHeader({ currentChat }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        background: theme.palette.primary.main,
        borderRadius: 2.5,
        padding: 1,
        gap: 1,
        width: "100%",
        cursor: "pointer",
      }}
      onClick={(e) => {
        dispatch(setDialogUser(currentChat.currentChatUser));
      }}
    >
      <Avatar src={currentChat?.currentChatUser?.photoURL} />
      <Box>
        <Typography variant="body1">
          {currentChat?.currentChatUser?.displayName}
        </Typography>
        <Typography sx={{ fontSize: 10 }} variant="subtitle2">
          {currentChat?.currentChatUser?.online?.state !== "online" &&
          Number.isInteger(currentChat?.currentChatUser?.online?.lastChange) ? (
            <ReactTimeAgo
              date={
                Number.isInteger(
                  currentChat?.currentChatUser?.online?.lastChange
                )
                  ? currentChat?.currentChatUser?.online?.lastChange
                  : 0
              }
              locale="ru-RU"
            />
          ) : currentChat?.currentChatUser?.online?.state === "online" ? (
            "онлайн"
          ) : (
            "Был(а) онлайн давно"
          )}
        </Typography>
      </Box>
      <UserProfile currentChatUser={currentChat?.currentChatUser} />
    </Box>
  );
}
