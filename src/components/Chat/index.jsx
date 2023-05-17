import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import { chatActions } from "../../redux/chat/chatAction";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";

function Chat() {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);

  const messRef = useRef(null);
  const chatRef = useRef(null);
  const { id } = useParams();
  const currentChat = chats.find((chat) => chat.id === id);
  useEffect(() => {
    if (id) {
      dispatch({ type: chatActions.GET_MESSAGES_SAGA, payload: id });
      dispatch({ type: chatActions.GET_CURRENT_CHAT_SAGA, payload: id });
    }
  }, [id]);

  console.log(currentChat);
  useEffect(() => {
    if (messRef.current) {
      messRef.current?.scrollIntoView({
        block: "end",
      });
    }
  }, [currentChat?.messages, chatRef.current]);

  return (
    currentChat?.messages && (
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
    )
  );
}
export default Chat;
