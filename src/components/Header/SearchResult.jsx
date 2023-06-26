import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SearchItem from "./SearchItem";
import { Box } from "@mui/system";

export default function SearchResult({
  status,
  active,
  result,
  searchText,
  setSearchText,
}) {
  return (
    <List
      sx={{
        position: "absolute",
        right: 0,
        zIndex: 100,
        display: searchText && active ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0.5,
        width: "100%",
        maxWidth: "26ch",
        minHeight: "50px",
        bgcolor: "background.paper",
      }}
    >
      {active && status === "loading" ? (
        <Typography sx={{ color: "black" }}>Поиск...</Typography>
      ) : result.length ? (
        result.map((res) => {
          return (
            <SearchItem setSearchText={setSearchText} key={res.id} res={res} />
          );
        })
      ) : searchText ? (
        <Typography sx={{ color: "black", fontSize: 13, textAlign:'center' }}>
          Нет результатов, введите полный Username...
        </Typography>
      ) : (
        ""
      )}
    </List>
  );
}
