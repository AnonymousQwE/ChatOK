import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { chatActions } from "../../redux/chat/chatAction";
import { useNavigate } from "react-router-dom";

export default function SearchItem({ res, setSearchText }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 10,
        "&:hover": {
          background: theme.palette.primary.light,
          cursor: "pointer",
        },
        transition: ".5s",
        width: "100%",
      }}
      onClick={() => {
        console.log(res);
        dispatch({
          type: chatActions.CREATE_NEW_CHAT_SAGA,
          payload: { res, navigate },
        });
        setSearchText("");
      }}
    >
      <ListItem sx={{ justifyContent: "center" }} alignItems="center">
        <ListItemAvatar>
          <Avatar
            sx={{ width: 50, height: 50 }}
            alt={res.displayName}
            src={res.photoURL}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {res.displayName}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </Box>
  );
}
