import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import Chat from "./components/Chat";
import ChatInput from "./components/Chat/ChatInput";
import Header from "./components/Header/Header";
import Sidebar from "components/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Routes } from "react-router-dom";
import NoChat from "./components/Chat/NoChat";
import { checkUser } from "./store/userThunk";
import ContextMenu from "./components/Sidebar/ContextMenu";
import { setContextMenu } from "./store/systemSlice";

function App() {
  const dispatch = useDispatch();
  const { contextMenu } = useSelector((state) => state.system);
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <>
      <Container
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          contextMenu.active &&
            dispatch(setContextMenu({ active: false, position: null }));
        }}
        maxWidth="lg"
      >
        <Header />
        <Grid
          container
          sx={{
            height: "calc(100vh - 64px)",
          }}
        >
          <Grid sx={{ position: "relative" }} item xs={3}>
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
              }}
            >
              <Sidebar />
            </Box>
          </Grid>
          <Grid item sx={{ position: "relative", maxHeight: "100%" }} xs={9}>
            <Routes>
              <Route element={<NoChat />} index />
              <Route element={<Chat />} path={"chat/:id"} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
      {contextMenu.active && <ContextMenu />}
    </>
  );
}

export default App;
