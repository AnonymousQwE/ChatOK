import React, { useEffect } from "react";
import { List, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { chatActions } from "../../redux/chat/chatAction";
import Loader from "../Loader/Loader";
import { Emoji } from "emoji-picker-react";

function Sidebar({ setContextMenu }) {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { chats, loading } = useSelector((state) => state.chat);

  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: 360,
        backgroundColor: "#fff",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <List sx={{ marginX: 0.5 }}>
        {loading ? (
          <Box
            sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Загрузка чатов... </Typography>
            <Emoji size={50} unified="1f971" />
            <Typography variant="body1">Пожалуйста подождите...</Typography>
          </Box>
        ) : chats.length == 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box sx={{ marginY: 3 }}>
              <Typography fontWeight={600} fontSize={16}>
                Нет чатов
              </Typography>
              <Emoji unified="1f937-200d-2642-fe0f" size={40} />
            </Box>
            <Typography fontWeight={600} fontSize={14}>
              Напишите в поиск имя пользователя собеседника для начала общения
            </Typography>
            <Emoji unified="1f609" size={40} />
          </Box>
        ) : (
          [...chats]
            .sort((chat1, chat2) =>
              chat1.lastMessage.createDate - chat2.lastMessage.createDate > 0
                ? -1
                : 1
            )
            ?.map((chat) => (
              <ChatListItem
                initial={{ y: -500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                setContextMenu={setContextMenu}
                key={chat.id}
                chat={chat}
              />
            ))
        )}
      </List>
    </Box>
  );
}

export default Sidebar;
