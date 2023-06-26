import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setMessageContextMenu } from "../../redux/slices/systemSlice";
import { Divider, ListItemIcon, ListItemText, MenuList } from "@mui/material";
import { Cloud, Delete, Edit } from "@mui/icons-material";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { generateChatQuery } from "../../utils/query";
import { db } from "../../firebase-setting";

export default function MessageContextMenu({
  setMessageEditable,
  setMessageText,
}) {
  const { messageContextMenu } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setMessageContextMenu(null));
  };
  return (
    <Menu
      open={messageContextMenu !== null}
      onClose={(e) => {
        e.preventDefault();
        dispatch(setMessageContextMenu(null));
      }}
      anchorReference="anchorPosition"
      anchorPosition={
        messageContextMenu !== null
          ? { top: messageContextMenu.mouseY, left: messageContextMenu.mouseX }
          : undefined
      }
    >
      <MenuList>
        <MenuItem
          onClick={async (e) => {
            dispatch(setMessageContextMenu(null));
            await deleteDoc(
              doc(
                db,
                "chats",
                messageContextMenu.ref.chat,
                "messages",
                messageContextMenu.ref.message
              )
            );
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            const docRef = doc(
              db,
              "chats",
              messageContextMenu.ref.chat,
              "messages",
              messageContextMenu.ref.message
            );
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setMessageText(docSnap.data().text);
              setMessageEditable({ ...docSnap.data(), id: docSnap.id });
            } else {
              console.log("No such document!");
            }
            dispatch(setMessageContextMenu(null));
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Изменить</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
