import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setContextMenu } from "../../redux/slices/systemSlice";
import { Divider, ListItemIcon, ListItemText, MenuList } from "@mui/material";
import { Cloud, Delete } from "@mui/icons-material";
import { deleteDoc } from "firebase/firestore";
import { generateChatQuery } from "../../utils/query";

export default function ContextMenu() {
  const { contextMenu } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setContextMenu(null));
  };
  return (
    <Menu
      open={contextMenu !== null}
      onClose={(e) => {
        e.preventDefault();
        dispatch(setContextMenu(null));
      }}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuList>
        <MenuItem
          onClick={async (e) => {
            await deleteDoc(generateChatQuery(contextMenu.ref));

            dispatch(setContextMenu(null));
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
