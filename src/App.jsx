import "./App.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContextMenu from "./components/Sidebar/ContextMenu";
import { userActions } from "./redux/user/userActions";
import MainLayout from "./components/Layout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Loader from "./components/Loader/Loader";
import { chatActions } from "./redux/chat/chatAction";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.system);
  const { currentUser } = useSelector((state) => state.user);
  const { chats, currentChat } = useSelector((state) => state.chat);

  useEffect(() => {
    if (currentUser.id) {
      dispatch({
        type: chatActions.GET_CHATS_SAGA,
      });
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (chats.length != 0) {
      dispatch({
        type: chatActions.GET_ONLINE_USERS_SAGA,
        payload: chats,
      });
    }
  }, [chats]);

  useEffect(() => {
    dispatch({ type: userActions.CHECK_USER_SAGA, payload: { dispatch } });
  }, []);

  if (status) return <Loader />;
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
    </>
  );
}

export default App;
