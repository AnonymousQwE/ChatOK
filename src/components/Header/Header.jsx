import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            ChatOK
          </Link>
        </Typography>
        <Search />
        <UserProfile />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
