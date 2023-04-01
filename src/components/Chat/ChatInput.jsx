import { Send } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { addDoc, collection, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase-setting";
import { createNewMessage } from "../../store/chatsThunk";

export default function ChatInput({ id }) {
  const [messageText, setMessageText] = useState("");

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      const newDate = new Date();
      const newMessage = {
        chatId: id,
        createDate: Timestamp.now(),
        owner: user.id,
        text: messageText.trim(),
        file: null,
        status: {
          send: true,
          read: false,
          error: false,
        },
      };
      dispatch(createNewMessage({ chatId: id, newMessage }));
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
