import React, { createRef, useEffect, useRef, useState } from "react";
import { List, useTheme, Box } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-setting";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";

function Chat() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const messRef = useRef(null);
  const { id } = useParams();

  const { chats } = useSelector((state) => state.chats);
  const currentChat = chats.filter((chat) => {
    return chat.id === id ? true : false;
  });
  useEffect(() => {
    messRef.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [currentChat[0]?.messages]);

  return (
    <Box
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        gap: "10px",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          margin: 1,
          overflowY: "auto",
          // overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <List
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: theme.spacing(2),
            maxWidth: "100%",
          }}
        >
          {currentChat[0]?.messages &&
            [...currentChat[0]?.messages]
              .sort((message1, message2) =>
                message1.createDate - message2.createDate > 0 ? 1 : -1
              )
              .map((message) => {
                return (
                  <ChatMessage
                    messRef={messRef}
                    message={message}
                    key={message.id}
                  />
                );
              })}
        </List>
      </Box>
      <Box>
        <ChatInput id={id} />
      </Box>
    </Box>
  );
}
export default Chat;
