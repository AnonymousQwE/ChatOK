import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setDialogUser } from "../../redux/slices/chatSlice";
import { IconButton, Slide } from "@mui/material";
import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function UserDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function UserProfileDialog({ currentChatUser }) {
  const dispatch = useDispatch();
  const { dialogUser } = useSelector((state) => state.chat);

  const handleClose = (e) => {
    dispatch(setDialogUser(null));
    e.stopPropagation();
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={handleClose}
      open={dialogUser !== null}
    >
      <UserDialogTitle onClose={handleClose}>
        {`Профиль ${currentChatUser?.displayName}`}
      </UserDialogTitle>
    </Dialog>
  );
}
