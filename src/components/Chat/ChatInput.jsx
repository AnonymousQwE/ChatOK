import { Send, TagFaces } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { addDoc, collection, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../redux/chat/chatAction";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import InputEmoji from "react-input-emoji";

export default function ChatInput({ id }) {
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showSmile, setShowSmile] = useState(false);
  window.global = window;
  const dispatch = useDispatch();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      dispatch({
        type: chatActions.SEND_MESSAGE_SAGA,
        payload: {
          chatId: id,
          text: messageText.trim(),
          senderId: currentUser.id,
        },
      });
      setMessageText("");
      setShowSmile(false);
    }
  };

  const handleShowSmile = (e) => {
    setShowSmile(!showSmile);
  };

  const handleSmile = (emoji) => {
    console.log(emoji);
    setMessageText(messageText + emoji.emoji);
  };

  return (
    <Box
      sx={{ flex: 1, position: "relative" }}
      component={"form"}
      onSubmit={handleSendMessage}
    >
      <TextField
        placeholder="Type a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e);
          }
        }}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <>
              <IconButton
                sx={{ position: "relative" }}
                onClick={handleShowSmile}
              >
                <TagFaces fontSize="large" color={showSmile ? "primary" : ""} />
              </IconButton>
              <Box
                sx={{
                  zIndex: 10,
                  display: showSmile ? "" : "none",
                  position: "absolute",
                  right: 90,
                  width: "300px",
                  height: "300px",
                  bottom: 45,
                }}
              >
                <EmojiPicker
                  height={300}
                  width={300}
                  // theme="dark"
                  onEmojiClick={handleSmile}
                />
              </Box>
              <IconButton onClick={handleSendMessage}>
                <Send fontSize="large" />
              </IconButton>
            </>
          ),
        }}
      />
    </Box>
  );
}
