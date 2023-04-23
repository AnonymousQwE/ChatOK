import React, { forwardRef } from "react";
import ChatMessage from "./ChatMessage";
import { Box, List, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

function MessageList({ currentChat, chatRef, user, messRef }, ref) {
  const variants = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
      },
    }),
    hidden: {
      opacity: 0,
    },
  };
  const theme = useTheme();
  return (
    <Box
      ref={(chatRef, ref)}
      onScroll={(e) => {
        console.log(e.target.scrollTop);
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
        <AnimatePresence initial={false}>
          {currentChat?.messages &&
            currentChat.chatUser !== null &&
            [...currentChat?.messages]
              .sort((message1, message2) =>
                message1.createDate - message2.createDate > 0 ? 1 : -1
              )
              .map((message, i) => {
                if (!message.status.read) {
                  // console.log("not read");
                } else {
                  console.log("read");
                }
                return (
                  <ChatMessage
                    layout
                    variants={variants}
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
        </AnimatePresence>
      </List>
    </Box>
  );
}

const ref = forwardRef(MessageList);

export default motion(ref);
