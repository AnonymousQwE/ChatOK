import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-setting";
import { Done, DoneAll } from "@mui/icons-material";
import ReactTimeAgo from "react-time-ago";
import { setMessageContextMenu } from "../../redux/slices/systemSlice";

function ChatMessage({ messRef, message, owner: chatUser, chatId }, ref) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { ref: reference, inView } = useInView({
    threshold: 1,
  });

  const handleContextMenu = (event) => {
    event.preventDefault();
    console.log(chatUser);
    if (chatUser.id == user.id) {
      dispatch(
        setMessageContextMenu({
          mouseX: event.pageX,
          mouseY: event.pageY,
          ref: { chat: chatId, message: message.id },
        })
      );
    }
  };

  useEffect(() => {
    if (
      inView &&
      message.senderId !== user.id &&
      message.senderId !== "system" &&
      message.status.read === false
    ) {
      const messagesRef = doc(db, `chats/${chatId}/messages`, message.id);
      const currentChatRef = doc(db, `chats`, chatId);

      updateDoc(messagesRef, {
        status: {
          ...message.status,
          read: true,
        },
      });
      updateDoc(currentChatRef, {
        noReadMessage: increment(-1),
      });
    }
  }, [inView]);

  const owner =
    message.senderId === user?.id
      ? true
      : message.senderId === "system"
      ? "system"
      : false;

  const setMessStyle = () => {
    const system = {
      position: "relative",
      backgroundColor: theme.palette.success.light,
      color: theme.palette.primary.contrastText,
      borderRadius: "10px",
      padding: theme.spacing(1.5),
    };
    const sentMessage = {
      position: "relative",
      maxWidth: "100%",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      overflowWrap: "break-word",
      borderRadius: "10px",
      padding: theme.spacing(1),
      "&::before": {
        content: `""`,
        position: "absolute",
        zIndex: -2,
        bottom: 0,
        right: -10,
        background: theme.palette.primary.main,
        width: "20px",
        height: "10px",
      },
      "&::after": {
        content: `""`,
        position: "absolute",
        zIndex: -1,
        bottom: -1,
        right: -17,
        background: theme.palette.background.paper,
        width: "17px",
        height: "17px",
        borderRadius: "10px",
      },
    };

    const receivedMessage = {
      position: "relative",
      display: "block",
      maxWidth: "100%",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      overflowWrap: "break-word",
      borderRadius: "10px",
      background: "rgba(185, 185, 185)",
      padding: theme.spacing(1),
      "&::before": {
        content: `""`,
        position: "absolute",
        zIndex: -2,
        bottom: 0,
        left: -10,
        background: "rgba(185, 185, 185)",
        width: "20px",
        height: "10px",
      },
      "&::after": {
        content: `""`,
        position: "absolute",
        zIndex: -1,
        bottom: -1,
        left: -17,
        background: theme.palette.background.paper,
        width: "17px",
        height: "17px",
        borderRadius: "10px",
      },
    };

    if (owner) {
      if (owner === "system") {
        return system;
      } else return sentMessage;
    } else {
      return receivedMessage;
    }
  };

  return (
    <>
      <ListItem
        onContextMenu={handleContextMenu}
        ref={ref}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: owner === "system" && "center",
          flexDirection: owner ? "row-reverse" : "row",
        }}
      >
        <ListItemAvatar
          sx={{
            display: owner === "system" ? "none" : "flex",
          }}
        >
          <Avatar
            sx={{ margin: "0 auto" }}
            alt={message.owner?.displayName}
            src={chatUser?.photoURL}
          />
        </ListItemAvatar>
        <Box
          ref={messRef}
          sx={{
            maxWidth: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems:
              owner === "system" ? "center" : owner ? "flex-end" : "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: owner ? "end" : "start",
              alignItems: owner ? "flex-end" : "flex-start",
            }}
            variant="caption"
          >
            <Typography
              ref={reference}
              sx={{
                display: owner === "system" && "none",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {chatUser?.displayName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: owner ? "flex-end" : "flex-start",
              width: "100%",
            }}
          >
            <Typography variant="body2" sx={setMessStyle()}>
              {message.text}
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: owner ? "flex-end" : "flex-start",
                }}
                variant="p"
              >
                {owner && message.status?.read ? (
                  <DoneAll fontSize="10" />
                ) : owner && message.status?.send ? (
                  <Done fontSize="10" />
                ) : (
                  ""
                )}
              </Typography>
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 10 }}>
            {
              <ReactTimeAgo
                date={
                  Number.isInteger(message.createDate) && message.createDate
                }
                locale="ru-RU"
              />
            }
          </Typography>
        </Box>
      </ListItem>
      {message.file && (
        <ListItem
          sx={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: theme.spacing(1),
          }}
        >
          <Box sx={{ marginLeft: theme.spacing(2) }}>
            {/* Render file or photo here */}
          </Box>
        </ListItem>
      )}
    </>
  );
}

const ref = forwardRef(ChatMessage);
export default motion(ref);
