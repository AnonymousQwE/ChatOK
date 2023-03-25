import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function ChatListItem({ chat }) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <ListItem
      onClick={() => {
        navigate(`/chat/${chat.id}`);
        console.log("click");
      }}
      sx={{
        position: "relative",
        zIndex: 10,
        transition: "0.2s",
        "&:hover": {
          background: theme.palette.primary.light,
          cursor: "pointer",
        },
        overflow: "hidden",
      }}
      key={chat.id}
    >
      <ListItemAvatar>
        <Badge
          sx={{
            "& .MuiBadge-badge": {
              width: 13,
              height: 13,
              borderRadius: "50%",
              backgroundColor: "green",
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          invisible={!chat.isOnline}
          variant={"dot"}
          overlap={"circular"}
        >
          <Avatar
            sx={{ width: 60, height: 60, marginRight: 1 }}
            src={chat.avatar}
            alt={chat.title}
          ></Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          chat.type === "dialog" ? (
            <Typography>{chat.members[0]}</Typography>
          ) : (
            <Typography variant={"body1"}>{chat.title}</Typography>
          )
        }
        secondary={
          <>
            <Typography component="span" variant="p" sx={{ fontSize: 10 }}>
              {chat.lastMessageTime.substring(12, 17) +
                " | " +
                chat.lastMessageTime.substring(0, 10)}
            </Typography>
            <br />
            <Typography component="span" variant="body2" color="textPrimary">
              {chat.lastMessage.substring(0, 18) + "..."}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}
