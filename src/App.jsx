import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import Chat from "./components/Chat";
import ChatInput from "./components/Chat/ChatInput";
import Header from "./components/Header/Header";
import Sidebar from "components/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChats } from "./hooks/chatsHooks";
import { checkUser } from "./hooks/firebaseHooks";
import { Route, Routes } from "react-router-dom";
import NoChat from "./components/Chat/NoChat";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser(dispatch);
  }, []);
  useEffect(() => {
    const unsub = getChats(dispatch, user);
    return unsub;
  }, [user]);
  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <Grid container sx={{ height: "calc(100vh - 64px)" }}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item sx={{ maxHeight: "100%" }} xs={9}>
            <Box sx={{ height: "88%", overflowY: "auto" }}>
              <Routes>
                <Route element={<NoChat />} index />
                <Route element={<Chat />} path={"chat/:id"} />
                {/* <Chat chatID={"VRWarWbJmqSzU51wF0Xc"} /> */}
              </Routes>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
