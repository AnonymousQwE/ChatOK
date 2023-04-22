import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setContextMenu } from "../../redux/slices/systemSlice";
import { formatTimestamp } from "../../utils/time";
import { getChatUser } from "../../utils/query";

export default function ChatListItem({ chat }) {
  const { currentUser: user } = useSelector((state) => state.user);
  const [currentChatUser, setCurrentChatUser] = useState({});
  const dispatch = useDispatch();
  const handleContextMenu = (event) => {
    event.preventDefault();
    dispatch(
      setContextMenu({
        active: true,
        position: { mouseX: event.pageX, mouseY: event.pageY },
        ref: chat.id,
      })
    );
  };

  const theme = useTheme();
  useEffect(() => {
    getChatUser(
      chat.members.filter((e) => {
        return e != user.id;
      })[0]
    ).then((res) => setCurrentChatUser(res));
  }, []);
  const dataAtr = { "data-id": chat.id };
  return (
    <>
      <NavLink
        style={{
          textDecoration: "none",
          color: theme.palette.text.primary,
        }}
        to={`chat/${chat.id}`}
      >
        {({ isActive, isPending }) => (
          <ListItem
            {...dataAtr}
            onContextMenu={handleContextMenu}
            sx={{
              background: isActive && theme.palette.primary.dark,
              position: "relative",
              borderRadius: 2,
              boxSizing: "border-box",
              marginBottom: 1,
              zIndex: 10,
              transition: "0.2s",
              boxShadow: "0px 0px 3px 1px " + theme.palette.primary.light,
              "&:hover": {
                background: theme.palette.primary.light,
                cursor: "pointer",
              },
              // overflow: "hidden",
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
                  src={currentChatUser?.avatar}
                  alt={currentChatUser?.displayName}
                ></Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                chat.type === "dialog" ? (
                  <Typography>{currentChatUser?.displayName}</Typography>
                ) : (
                  <Typography variant={"body1"}>
                    {currentChatUser?.displayName}
                  </Typography>
                )
              }
              secondary={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {chat.lastMessageOwner === user.id ? (
                      <Typography
                        variant="p"
                        sx={{ marginRight: 0.5, fontWeight: 600 }}
                      >
                        Вы:
                      </Typography>
                    ) : (
                      ""
                    )}
                    {chat.lastMessage.length > 20
                      ? chat?.lastMessage?.substring(0, 15) + "..."
                      : chat.lastMessage}
                  </Typography>
                  <Typography
                    component="span"
                    variant="p"
                    sx={{
                      marginLeft: 0.5,
                      fontSize: 9,
                      fontWeight: 600,
                      background: theme.palette.primary.main,
                      textAlign: "center",
                      padding: 0.3,
                      borderRadius: 1,
                    }}
                  >
                    {formatTimestamp(chat.lastMessageTime).substring(12, 20)}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        )}
      </NavLink>
    </>
  );
}
