import { Box, Typography } from "@mui/material";
import React from "react";
import ContextMenu from "../Sidebar/ContextMenu";
import UserProfile from "../DialogUserProfile";
import { Emoji } from "emoji-picker-react";

export default function NoChat() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">
        У Вас еще не выбран активный чат, пожалуйста выберите чат...
      </Typography>
      <Emoji unified="1f448" size={50} />
    </Box>
  );
}
