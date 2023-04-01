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

export default function SearchResult({ status, active, result, searchText }) {
  return status === "loading" && active ? (
    <Box
      sx={{
        position: "absolute",
        right: 0,
        marginTop: 0.5,
        width: "100%",
        maxWidth: "26ch",
        bgcolor: "background.paper",
      }}
    >
      <Typography sx={{ color: "black" }}>LOADING</Typography>
    </Box>
  ) : (
    <List
      sx={{
        display:
          (active && result.length) ||
          status == "loading" ||
          (active && searchText)
            ? "block"
            : "none",
        position: "absolute",
        right: 0,
        marginTop: 0.5,
        width: "100%",
        maxWidth: "26ch",
        bgcolor: "background.paper",
      }}
    >
      {result.length ? (
        result.map((res) => {
          return <SearchItem key={res.id} res={res} />;
        })
      ) : (
        <Typography sx={{ color: "red" }}>"РЕЗУЛЬТАТОВ НЕТ"</Typography>
      )}
    </List>
  );
}
