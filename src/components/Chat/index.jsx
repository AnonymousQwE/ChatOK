import React, { createRef, useEffect, useRef, useState } from "react";
import { List, useTheme, Box } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-setting";
import { useParams } from "react-router-dom";
import { addMessage, setMessages } from "../../store/messagesSlice";
import ChatInput from "./ChatInput";

function Chat() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const messRef = useRef(null);
  const { id } = useParams();

  const { messages } = useSelector((state) => state.messages);
  useEffect(() => {
    messRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "chats", id, "messages"),
      (query) => {
        const messages = [];
        query.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
          // console.log({ id: doc.id, ...doc.data() });
        });
        dispatch(setMessages(messages));
      }
    );
    return unsub;
  }, [id]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          paddingBottom: 1,
        }}
      >
        <List
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: theme.spacing(2),
            minWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {messages.map((message) => {
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
      <ChatInput id={id} />
    </>
  );
}
export default Chat;
