import React, { forwardRef } from "react";
import ChatMessage from "./ChatMessage";
import { Box, List, useTheme } from "@mui/material";
import { motion } from "framer-motion";

function MessageList({ currentChat, chatRef, user, messRef }, ref) {
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
      onScroll={(e) => {
        console.log(window);
      }}
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
        {currentChat?.messages &&
          currentChat.chatUser !== null &&
          [...currentChat?.messages]
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
                    message.owner === user.id ? user : currentChat.chatUser
                  }
                  messRef={messRef}
                  message={message}
                  key={message.id}
                  custom={i}
                />
              );
            })}
      </List>
    </Box>
  );
}

const ref = forwardRef(MessageList);

export default motion(ref);
