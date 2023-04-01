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
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, DialogActions, DialogContent, TextField } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];

export default function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Avatar
        sx={{ cursor: "pointer" }}
        alt={user?.displayName}
        // onClick={async () => {
        //   if (!user) {
        //     dispatch(signInGoogle());
        //   } else dispatch(logoutUser());
        // }}
        onClick={handleClickOpen}
        src={user?.photoURL}
      />
      <UserProfileData
        user={user}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

function UserProfileData(props) {
  const { user, onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={handleClose} open={open}>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt={user?.displayName}
            // onClick={async () => {
            //   if (!user) {
            //     dispatch(signInGoogle());
            //   } else dispatch(logoutUser());
            // }}
            src={user?.photoURL}
          />
          {user?.displayName}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: 350,
            maxWidth: "80%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            margin: "10px auto",
          }}
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>Cancel</Button>
        <Button>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
