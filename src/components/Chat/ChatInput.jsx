import { Send } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessage } from "store/messagesSlice";
import { db } from "../../firebase-setting";

export default function ChatInput({ id }) {
  const [messageText, setMessageText] = useState("");

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      const newMessage = {
        createDate: Timestamp.fromDate(new Date()),
        owner: user.uid,
        text: messageText.trim(),
        file: null,
      };
      const docRef = await setDoc(collection(db, `chats/${id}/messages`), {
        text: messageText.trim(),
        owner: user.uid,
        createDate: Timestamp.fromDate(new Date()),
      });
      // dispatch(addMessage(newMessage));
      console.log(docRef);
      setMessageText("");
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSendMessage}>
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
