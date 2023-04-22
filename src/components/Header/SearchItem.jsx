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
import { createNewDialog } from "../../storeOLD/chatsThunk";

export default function SearchItem({ res }) {
  const theme = useTheme();
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
      }}
      onClick={() => {
        dispatch(createNewDialog({ userId: res.id }));
      }}
    >
      <ListItem sx={{ justifyContent: "center" }} alignItems="center">
        <ListItemAvatar>
          <Avatar
            sx={{ width: 50, height: 50 }}
            alt={res.displayName}
            src={res.avatar}
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
          secondary={"Был онлайн в 12:15"}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Box>
  );
}
