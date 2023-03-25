import React from "react";
import { List, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";

function Sidebar() {
  const { chats } = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Paper sx={{ height: "100%" }} elevation={2}>
        <List>
          {chats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Sidebar;
