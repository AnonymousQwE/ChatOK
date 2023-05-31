import React from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Chat from "../Chat/";
import Sidebar from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import NoChat from "../Chat/NoChat";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log(mobile);
  return (
    <Box
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <Grid
        container
        sx={{
          height: "calc(100vh - 64px)",
        }}
      >
        <Grid sx={{ position: "relative" }} item md={3} xs={12}>
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
        <Grid item sx={{ position: "relative", height: "100%" }} md={9} xs={12}>
          <Routes>
            <Route element={mobile ? <Sidebar /> : <NoChat />} index />
            <Route element={<Chat />} path={"chat/:id"} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
