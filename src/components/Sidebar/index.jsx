import React from "react";
import { List, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";

function Sidebar({ setContextMenu }) {
  const { chats } = useSelector((state) => state.chats);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        backgroundColor: "#fff",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Paper sx={{ minHeight: "100%" }} elevation={3}>
        <List>
          {chats &&
            [...chats]
              .sort((chat1, chat2) =>
                chat1.lastMessageTime - chat2.lastMessageTime > 0 ? -1 : 1
              )
              ?.map((chat) => (
                <ChatListItem
                  setContextMenu={setContextMenu}
                  key={chat.id}
                  chat={chat}
                />
              ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Sidebar;
