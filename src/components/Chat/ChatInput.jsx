import { Send } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { addDoc, collection, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../../redux/chat/chatAction";

export default function ChatInput({ id }) {
  const [messageText, setMessageText] = useState("");

  const dispatch = useDispatch();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      dispatch({
        type: chatActions.SEND_MESSAGE_SAGA,
        payload: { chatId: id, text: messageText.trim() },
      });
      setMessageText("");
    }
  };

  return (
    <Box sx={{ flex: 1 }} component={"form"} onSubmit={handleSendMessage}>
      <TextField
        placeholder="Type a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSendMessage}>
              <Send />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
