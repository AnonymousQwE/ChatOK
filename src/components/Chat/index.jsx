import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import { chatActions } from "../../redux/chat/chatAction";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageContextMenu from "./MessageContextMenu";

function Chat() {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { chats, chatMessages } = useSelector((state) => state.chat);
  const [messageText, setMessageText] = useState("");
  const [messageEditable, setMessageEditable] = useState();

  const messRef = useRef(null);
  const chatRef = useRef(null);
  const { id } = useParams();
  const currentChat = chats.find((chat) => chat.id === id);
  useEffect(() => {
    if (id) {
      dispatch({ type: chatActions.GET_MESSAGES_SAGA, payload: id });
    }
  }, [id]);
  useEffect(() => {
    if (messRef.current) {
      messRef.current?.scrollIntoView({
        block: "end",
      });
    }
  }, [chatMessages, messRef.current]);

  return (
    chatMessages && (
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
          layout
          layoutScroll
          chatMessages={chatMessages}
          messRef={messRef}
          user={user}
          currentChat={currentChat}
          chatRef={chatRef}
          chatId={id}
        />
        <Box>
          <ChatInput
            setMessageEditable={setMessageEditable}
            messageEditable={messageEditable}
            messageText={messageText}
            setMessageText={setMessageText}
            id={id}
          />
        </Box>
        <MessageContextMenu
          setMessageEditable={setMessageEditable}
          setMessageText={setMessageText}
        />
      </Box>
    )
  );
}
export default Chat;
