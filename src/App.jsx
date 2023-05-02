import "./App.css";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContextMenu from "./components/Sidebar/ContextMenu";
import { userActions } from "./redux/user/userActions";
import MainLayout from "./components/Layout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";

function App() {
  const dispatch = useDispatch();
  const { contextMenu, status } = useSelector((state) => state.system);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: userActions.CHECK_USER_SAGA, payload: { dispatch } });
  }, []);
  if (status === "loading") return "LOADING";
  return (
    <>
      <Header />
      <Routes>
        <Route
          element={currentUser.id ? <Navigate to={"/"} /> : <Auth />}
          path={"/auth"}
        />
        <Route
          element={currentUser.id ? <MainLayout /> : <Navigate to={"/auth"} />}
          path={"/*"}
        />
      </Routes>
      {contextMenu.active && <ContextMenu />}
    </>
  );
}

export default App;
