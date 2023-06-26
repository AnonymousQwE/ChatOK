import { Send, TagFaces } from "@mui/icons-material";
import { Box, IconButton, Paper, TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../redux/chat/chatAction";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { db } from "../../firebase-setting";
import { padding } from "@mui/system";

export default function ChatInput({
  messageEditable,
  setMessageEditable,
  id,
  messageText,
  setMessageText,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const [showSmile, setShowSmile] = useState(false);
  const dispatch = useDispatch();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      if (!messageEditable) {
        dispatch({
          type: chatActions.SEND_MESSAGE_SAGA,
          payload: {
            chatId: id,
            text: messageText.trim(),
            senderId: currentUser.id,
          },
        });
        setMessageText("");
      } else {
        const docRef = doc(db, "chats", id, "messages", messageEditable.id);
        updateDoc(docRef, { text: messageText });
        setMessageText("");
        setMessageEditable(null);
      }
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
      sx={{ flex: 1, position: "relative", paddingTop: 1 }}
      component={"form"}
      onSubmit={handleSendMessage}
    >
      {messageEditable?.id && (
        <Paper>
          <Box>{messageEditable.text}</Box>
        </Paper>
      )}
      <Paper>
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
                  <TagFaces
                    fontSize="large"
                    color={showSmile ? "primary" : ""}
                  />
                </IconButton>
                <Box
                  sx={{
                    zIndex: 10,
                    display: showSmile ? "" : "none",
                    position: "absolute",
                    right: 200,
                    width: "300px",
                    height: "300px",
                    bottom: 240,
                  }}
                >
                  <EmojiPicker
                    height={500}
                    width={400}
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
      </Paper>
    </Box>
  );
}
