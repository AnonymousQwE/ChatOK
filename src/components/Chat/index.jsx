import React, { createRef, useEffect, useRef, useState } from "react";
import { List, useTheme, Box, Typography, Avatar, Paper } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-setting";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import { chatActions } from "../../redux/chat/chatAction";
import { getChatUser } from "../../utils/query";
import { setCurrentChatUser } from "../../redux/slices/chatSlice";

function Chat() {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { currentChat } = useSelector((state) => state.chat);

  const theme = useTheme();
  const messRef = useRef(null);
  const chatRef = useRef(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch({ type: chatActions.GET_MESSAGES_SAGA, payload: id });
      dispatch({ type: chatActions.GET_CURRENT_CHAT_SAGA, payload: id });
    }
  }, [id]);
  useEffect(() => {
    if (currentChat.members && user?.id) {
      getChatUser(currentChat.members.filter((u) => u !== user.id)[0]).then(
        (chatUser) => {
          console.log(chatUser);
          dispatch(
            setCurrentChatUser({
              ...chatUser,
              createDate: chatUser.createDate.toMillis(),
            })
          );
        }
      );
    }
  }, [currentChat.members, user.id]);

  useEffect(() => {
    messRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, [currentChat?.messages, currentChat.chatUser, chatRef.current]);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingY: 1,
        paddingX: 1,
      }}
    >
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

      <Box
        ref={chatRef}
        sx={{
          margin: 1,
          overflowY: "auto",
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
          {currentChat?.messages &&
            currentChat.chatUser !== null &&
            [...currentChat?.messages]
              .sort((message1, message2) =>
                message1.createDate - message2.createDate > 0 ? 1 : -1
              )
              .map((message) => {
                return (
                  <ChatMessage
                    owner={
                      message.owner === user.id ? user : currentChat.chatUser
                    }
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
