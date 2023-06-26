import { Avatar, Badge, Box, Typography, useTheme } from "@mui/material";
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
      <Badge
        sx={{
          "& .MuiBadge-badge": {
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "green",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        invisible={
          currentChat?.currentChatUser?.online?.state === "online"
            ? false
            : true
        }
        variant={"dot"}
        overlap={"circular"}
      >
        <Avatar src={currentChat?.currentChatUser?.photoURL} />
      </Badge>
      <Box>
        <Typography variant="body1">
          {currentChat?.currentChatUser?.displayName}
        </Typography>
        <Typography sx={{ fontSize: 10 }} variant="subtitle2">
          {currentChat?.currentChatUser?.online?.state !== "online" &&
          Number.isInteger(currentChat?.currentChatUser?.online?.lastChange) ? (
            <Typography variant="p">
              {"Был(а) онлайн "}
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
            </Typography>
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
