import React, { useEffect } from "react";
import { List, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { chatActions } from "../../redux/chat/chatAction";
import Loader from "../Loader/Loader";

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
          <Typography>Загрузка чатов...</Typography>
        ) : chats.length == 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={600} fontSize={18}>
              Нет чатов
            </Typography>
            <Button sx={{ fontSize: 12 }} variant="outlined">
              Начать новый чат
            </Button>
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
