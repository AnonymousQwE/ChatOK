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
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setContextMenu } from "../../store/systemSlice";
import { formatTimestamp } from "../../utils/time";
import ContextMenu from "./ContextMenu";

export default function ChatListItem({ chat }) {
  const dispatch = useDispatch();
  const handleContextMenu = (event) => {
    event.preventDefault();
    console.log(event);
    dispatch(
      setContextMenu({
        active: true,
        position: { mouseX: event.pageX, mouseY: event.pageY },
        ref: chat.id,
      })
    );
    console.log({
      mouseX: event.clientX,
      mouseY: event.clientY,
    });
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const dataAtr = { "data-id": chat.id };
  return (
    <>
      <NavLink
        style={{ textDecoration: "none", color: theme.palette.text.primary }}
        to={`chat/${chat.id}`}
      >
        {({ isActive, isPending }) => (
          <ListItem
            {...dataAtr}
            onContextMenu={handleContextMenu}
            sx={{
              background: isActive && theme.palette.primary.light,
              position: "relative",
              zIndex: 10,
              transition: "0.2s",
              "&:hover": {
                background: theme.palette.primary.dark,
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
                  <Typography>{chat.id}</Typography>
                ) : (
                  <Typography variant={"body1"}>{chat.title}</Typography>
                )
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="p"
                    sx={{ fontSize: 10 }}
                  >
                    {formatTimestamp(chat.lastMessageTime)}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {chat?.lastMessage?.substring(0, 18) + "..."}
                  </Typography>
                </>
              }
            />
          </ListItem>
        )}
      </NavLink>
    </>
  );
}
