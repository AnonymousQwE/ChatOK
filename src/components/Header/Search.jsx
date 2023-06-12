import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, InputBase, styled, TextField, useTheme } from "@mui/material";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase-setting";
import SearchResult from "./SearchResult";
import { Box } from "@mui/system";

export default function Search() {
  const theme = useTheme();
  const [result, setResult] = useState([]);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("loaded");
  const [searchText, setSearchText] = useState("");

  return (
    <Box sx={{ position: "relative", maxWidth: "100%" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
          marginLeft: 0,
          width: "100%",
          [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
          },
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchIcon />
        </Box>
        <InputBase
          sx={{
            color: "inherit",
            "& .MuiInputBase-input": {
              padding: theme.spacing(1, 1, 1, 0),
              paddingLeft: `calc(1em + ${theme.spacing(4)})`,
              transition: theme.transitions.create("width"),
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                  width: "20ch",
                },
              },
            },
          }}
          value={searchText}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(false);
          }}
          onKeyUp={async () => {
            setResult([]);
            setStatus("loading");
            const q = query(
              collection(db, "users"),
              where(
                "userName",
                "==",
                searchText.toLowerCase().replace("@", "")
              ),
              limit(5)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const currentResult = result.filter((res) => res.id !== doc.id);
              setResult([...currentResult, { id: doc.id, ...doc.data() }]);
            });
            setStatus("loaded");
          }}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Box>
      <SearchResult
        setSearchText={setSearchText}
        searchText={searchText}
        status={status}
        active={active}
        result={result}
      />
    </Box>
  );
}
