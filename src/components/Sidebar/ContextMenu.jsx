import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Cloud from "@mui/icons-material/Cloud";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { deleteDoc } from "firebase/firestore";
import { generateChatQuery, generateMessagesQuery } from "../../utils/query";
// import { unsetContextMenu } from "../../storeOLD/systemSlice";

export default function ContextMenu() {
  const dispatch = useDispatch();
  const { contextMenu } = useSelector((state) => state.system);
  return (
    <Paper
      sx={{
        position: "absolute",
        zIndex: 100,
        top: `${contextMenu?.position?.mouseY}px`,
        left: `${contextMenu?.position?.mouseX}px`,
        width: 200,
        maxWidth: "100%",
      }}
    >
      <MenuList>
        <MenuItem
          onClick={async (e) => {
            await deleteDoc(generateChatQuery(contextMenu.ref));

            dispatch(unsetContextMenu());
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
    </Paper>
  );
}
