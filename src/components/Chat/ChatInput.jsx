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

  const dispatch = useDispatch();
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(messageText);
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
                <TagFaces fontSize="large" />
              </IconButton>
              <Box
                sx={{
                  zIndex: 10,
                  display: showSmile ? "" : "none",
                  position: "absolute",
                  right: 50,
                  bottom: 50,
                }}
              >
                <EmojiPicker
                  // height={0}
                  // width={0}
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

      {/* <Emoji unified="1f423" size="25" /> */}
    </Box>
  );
}
