import "./App.css";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContextMenu from "./components/Sidebar/ContextMenu";
import { userActions } from "./redux/user/userActions";
import MainLayout from "./components/Layout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";

function App() {
  const dispatch = useDispatch();
  const { contextMenu } = useSelector((state) => state.system);

  useEffect(() => {
    dispatch({ type: userActions.CHECK_USER_SAGA });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route element={<Auth />} path={"/auth"} />
        <Route element={<MainLayout />} path={"/*"} />
      </Routes>
      {contextMenu.active && <ContextMenu />}
    </>
  );
}

export default App;
