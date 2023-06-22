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
  // const [contextMenu, setContextMenu] = React.useState(null);
  const { contextMenu } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  // const handleContextMenu = (event) => {
  //   event.preventDefault();
  //   dispatch(
  //     setContextMenu(
  //       contextMenu === null
  //         ? {
  //             mouseX: event.clientX + 2,
  //             mouseY: event.clientY - 6,
  //           }
  //         : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
  //           // Other native context menus might behave different.
  //           // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
  //           null
  //     )
  //   );
  // };

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
          <Typography variant="body2" color="text.secondary">
            ⌘D
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
