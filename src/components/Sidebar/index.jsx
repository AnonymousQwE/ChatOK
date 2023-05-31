import React, { useEffect } from "react";
import { List, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { chatActions } from "../../redux/chat/chatAction";

function Sidebar({ setContextMenu }) {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);

  useEffect(() => {
    if (user.id) {
      dispatch({
        type: chatActions.GET_USER_CHATS_SAGA,
        payload: { id: user.id },
      });
    }
  }, [user.id]);

  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: 360,
        backgroundColor: "#fff",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <List sx={{ marginX: 0.5 }}>
        {chats &&
          [...chats]
            .sort((chat1, chat2) =>
              chat1.lastMessage.createDate - chat2.lastMessage.createDate > 0
                ? -1
                : 1
            )
            ?.map((chat) => (
              <ChatListItem
                initial={{ y: -500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                setContextMenu={setContextMenu}
                key={chat.id}
                chat={chat}
              />
            ))}
      </List>
    </Box>
  );
}

export default Sidebar;
