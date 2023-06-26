import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setDialogUser } from "../../redux/slices/chatSlice";
import { Avatar, Box, Divider } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import {
  EmailOutlined,
  InfoOutlined,
  PhoneAndroidOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
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
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function DialogUserProfile() {
  const [open, setOpen] = React.useState(false);
  const { dialogUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    dispatch(setDialogUser(null));
    e.stopPropagation();
  };

  return (
    dialogUser !== null && (
      <div>
        <BootstrapDialog
          maxWidth={"xs"}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={dialogUser !== null}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {`Информация`}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{ width: 70, height: 70 }}
                  src={dialogUser?.photoURL}
                />
                <Typography variant="caption">{`@${dialogUser.userName}`}</Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", flex: 1 }}>
                  <SupervisedUserCircleOutlined fontSize="large" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                      {`${dialogUser?.displayName}`}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} variant="subtitle2">
                      {dialogUser?.online?.state !== "online" &&
                      Number.isInteger(dialogUser?.online?.lastChange) ? (
                        <Typography variant="p">
                          {"Был(а) онлайн "}
                           <ReactTimeAgo
                            date={
                              Number.isInteger(dialogUser?.online?.lastChange)
                                ? dialogUser?.online?.lastChange
                                : 0
                            }
                            locale="ru-RU"
                          />
                        </Typography>
                      ) : dialogUser?.online?.state === "online" ? (
                        "онлайн"
                      ) : (
                        "Был(а) онлайн давно"
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Divider variant="middle" />

                <Box
                  sx={{ display: "flex", mt: 1, alignItems: "center", gap: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PhoneAndroidOutlined fontSize="large" />
                  </Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      fontWeight: "bold",
                      flex: 1,
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 15 }}>
                      {dialogUser?.phoneNumber || "Нет"}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} variant="p">
                      Номер
                    </Typography>
                  </Box>
                </Box>
                <Divider variant="middle" />
                <Box
                  sx={{ display: "flex", mt: 1, alignItems: "center", gap: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EmailOutlined fontSize="large" />
                  </Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      fontWeight: "bold",
                      flexDirection: "column",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: 15 }}>
                      {dialogUser?.email}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} variant="p">
                      Email
                    </Typography>
                  </Box>
                </Box>
                <Divider variant="middle" />
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InfoOutlined fontSize="large" />
                  </Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      fontWeight: "bold",
                      flex: 1,
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 15 }}>
                      {dialogUser?.createDate.toDate().toLocaleString()}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} variant="p">
                      Дата создания
                    </Typography>
                  </Box>
                </Box>
                <Divider variant="middle" />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Закрыть
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    )
  );
}
