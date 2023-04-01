import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { formatTimestamp } from "../../utils/time";

export default function ChatMessage({ messRef, message }) {
  const theme = useTheme();
  const { user } = useSelector((state) => state.user);

  const owner =
    message.owner === user?.id
      ? true
      : message.owner === "system"
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
      display: "inline-block",
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
        ref={messRef}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: owner === "system" && "center",
          flexDirection: owner ? "row-reverse" : "row",
        }}
      >
        <ListItemAvatar
          sx={{
            display: "flex",
            display: owner === "system" && "none",
          }}
        >
          <Avatar
            sx={{ margin: "0 auto" }}
            alt={message.owner?.displayName}
            src={message.owner?.photoURL}
          />
        </ListItemAvatar>
        <Box
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
              sx={{
                display: owner === "system" && "none",
                fontSize: 12,
              }}
            >
              {message.owner.substring(0, 10)}
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              {formatTimestamp(message.createDate)}
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
            </Typography>
          </Box>
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
      {/* <Divider /> */}
    </>
  );
}
