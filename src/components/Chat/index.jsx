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
import ChatHeader from "./ChatHeader";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import MessageList from "./MessageList";

function Chat() {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { currentChat } = useSelector((state) => state.chat);
  const { scroll, setScroll } = useState(0);

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
    if (messRef.current) {
      messRef.current?.scrollIntoView({
        block: "end",
      });
    }
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
      <ChatHeader currentChat={currentChat} />
      <MessageList
        messRef={messRef}
        user={user}
        currentChat={currentChat}
        chatRef={chatRef}
      />

      <Box>
        <ChatInput id={id} />
      </Box>
    </Box>
  );
}
export default Chat;
