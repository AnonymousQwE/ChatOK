import React, { forwardRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { Box, List, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../redux/chat/chatAction";

function MessageList(
  { currentChat, chatRef, user, messRef, chatId, chatMessages },
  ref
) {
  const newMessage = {
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 0.7,
        // delay: i > 5 ? 0.1 : i * 0.1,
      },
    }),
    hidden: {
      opacity: 0,
      x: -200,
    },
  };
  const theme = useTheme();
  return (
    <Box
      ref={(chatRef, ref)}
      // onScroll={(e) => {
      //   console.log(window);
      // }}
      sx={{
        margin: 1,
        overflowY: "auto",
        overflowX: "hidden",
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
        {chatMessages &&
          currentChat?.currentChatUser !== null &&
          [...chatMessages]
            .sort((message1, message2) =>
              message1.createDate - message2.createDate > 0 ? 1 : -1
            )
            .map((message, i) => {
              return (
                <ChatMessage
                  variants={newMessage}
                  initial={"hidden"}
                  animate={"visible"}
                  owner={
                    message?.senderId === user.id
                      ? user
                      : currentChat?.currentChatUser
                  }
                  messRef={messRef}
                  message={message}
                  key={message.createDate}
                  custom={i}
                  chatId={chatId}
                />
              );
            })}
      </List>
    </Box>
  );
}

const ref = forwardRef(MessageList);

export default motion(ref);
