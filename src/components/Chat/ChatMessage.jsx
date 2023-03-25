import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function ChatMessage({ messRef, message }) {
  const theme = useTheme();
  const { user } = useSelector((state) => state.user);

  let owner;
  const setMessStyle = (senderID) => {
    if (senderID === user?.id) {
      owner = true;
    } else owner = false;
    const sentMessage = {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: "20px",
      padding: theme.spacing(1, 2),
    };
    const receivedMessage = {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderRadius: "20px",
      padding: theme.spacing(1, 2),
    };
    if (senderID === user?.id) {
      return sentMessage;
    } else {
      return receivedMessage;
    }
  };
  return (
    <>
      <ListItem
        ref={messRef}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
          marginBottom: theme.spacing(1),
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={message.owner.displayName}
            src={message.owner.photoURL}
          />
        </ListItemAvatar>
        <Box
          sx={{
            paddingRight: 1,
            maxWidth: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: owner ? "row-reverse" : "row",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
            variant="caption"
          >
            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              {message.owner.displayName}
            </Typography>
            <Typography sx={{ fontSize: 10 }}>·</Typography>
            <Typography sx={{ fontSize: 10 }}>{message.createDate}</Typography>
          </Box>
          <Typography variant="body2" sx={setMessStyle(message.owner)}>
            {message.text}
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
      <Divider />
    </>
  );
}
