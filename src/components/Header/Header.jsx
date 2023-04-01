import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@mui/material";
import { db } from "../../firebase-setting";
import { useDispatch, useSelector } from "react-redux";
import { createNewDialog } from "../../hooks/firebaseHooks";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import Search from "./Search";
import { logoutUser, signInGoogle } from "../../store/userThunk";
import UserProfile from "./UserProfile";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ChatOK
        </Typography>
        <Search />
        {user && (
          <Button
            onClick={() =>
              dispatch(
                createNewDialog({
                  chat: { user: "JEbaZzo5OmdsLvY6njceJjUy9PN2" },
                  message: { text: "Hello World" },
                })
              )
            }
            variant="contained"
          >
            Создать чат
          </Button>
        )}
        {user && (
          <Button
            onClick={async () => {
              const messages = query(
                collectionGroup(db, "messages"),
                where("owner", "==", "Alex")
              );
              const querySnapshot = await getDocs(messages);

              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
              });
            }}
            variant="contained"
          >
            Поиск
          </Button>
        )}

        <UserProfile />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
