import React from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Chat from "../Chat/";
import Sidebar from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import NoChat from "../Chat/NoChat";
import { useDispatch, useSelector } from "react-redux";
import { setContextMenu } from "../../redux/slices/systemSlice";
import ContextMenu from "../Sidebar/ContextMenu";
import EmojiPicker, { Emoji } from "emoji-picker-react";

const MainLayout = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { contextMenu } = useSelector((state) => state.system);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
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
            <div
              style={{ cursor: "context-menu" }}
              onContextMenu={(e) => {
                e.preventDefault();
                dispatch(
                  setContextMenu(
                    contextMenu === null
                      ? {
                          mouseX: event.clientX + 2,
                          mouseY: event.clientY - 6,
                        }
                      : null
                  )
                );
              }}
            >
              {mobile ? "" : <Sidebar />}
              <ContextMenu />
            </div>
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
