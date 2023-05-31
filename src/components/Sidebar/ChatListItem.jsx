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
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setContextMenu } from "../../redux/slices/systemSlice";
import { formatTimestamp } from "../../utils/time";
import { motion } from "framer-motion";
import { getUserDataFormDB } from "../../redux/user/userAPI";
import { realTimeDb } from "../../firebase-setting";
import { onValue, ref } from "firebase/database";

function ChatListItem({ chat }, reference) {
  const { currentUser: user } = useSelector((state) => state.user);
  const [online, setOnline] = useState("");
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

  useEffect(() => {
    const onlineRef = ref(realTimeDb, "status", chat.currentChatUser.id);
    onValue(onlineRef, (snap) => {
      const currentUserOnline = snap.val()[chat.currentChatUser.id];
      setOnline(currentUserOnline);
    });
  }, []);

  const theme = useTheme();

  const dataAtr = { "data-id": chat.id };
  console.log(online);
  return (
    <Box ref={reference}>
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
                  src={chat.currentChatUser?.photoURL}
                  alt={chat.currentChatUser?.displayName}
                ></Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              component={"div"}
              primary={
                <Typography
                  sx={{ fontSize: { xs: 15, md: 20 } }}
                  variant={"body1"}
                >
                  {chat.currentChatUser.displayName}
                </Typography>
              }
              secondary={
                <Box
                  component={"span"}
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
                    <Typography
                      variant="p"
                      sx={{ marginRight: 0.5, fontWeight: 600 }}
                    >
                      {chat.lastMessage.senderId === user.id ? "Вы:" : ""}
                    </Typography>
                    {chat.lastMessage.text.length > 20
                      ? chat?.lastMessage?.text?.substring(0, 15) + "..."
                      : chat.lastMessage?.text}
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
                    {formatTimestamp(chat.lastMessage.createDate).substring(
                      12,
                      20
                    )}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        )}
      </NavLink>
    </Box>
  );
}

const reference = forwardRef(ChatListItem);

export default motion(reference);
