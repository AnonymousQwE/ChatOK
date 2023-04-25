import React from "react";
import { Box, Grid } from "@mui/material";
import Chat from "../Chat/";
import Sidebar from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import NoChat from "../Chat/NoChat";
import Auth from "../Auth";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  return (
    <Box
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      // onClick={(e) => {
      //   contextMenu.active &&
      //     dispatch(setContextMenu({ active: false, position: null }));
      // }}
    >
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
        <Grid item sx={{ position: "relative", height: "100%" }} xs={9}>
          <Routes>
            <Route element={<NoChat />} index />
            <Route element={<Chat />} path={"chat/:id"} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
