import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";

export default function ChatHeader({ currentChat }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        background: theme.palette.primary.main,
        borderRadius: 2.5,
        padding: 1,
        gap: 1,
        width: "100%",
      }}
    >
      <Avatar src={currentChat.chatUser?.photoURL} />
      <Box>
        <Typography variant="body1">
          {currentChat.chatUser?.displayName}
        </Typography>
        <Typography sx={{ fontSize: 10 }} variant="subtitle2">
          был онлайн {new Date().toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
}
