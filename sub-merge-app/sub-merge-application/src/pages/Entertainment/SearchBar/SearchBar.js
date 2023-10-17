import * as React from "react";
import { useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchFilter from "./SearchFilter";

export default function SearchBar(props) {
  const [modalShow, setModalShow] = useState(false);
  const [filterData, setFilterData] = useState({});
  const searchInputRef = useRef();

  const searchBtnHandler = (event) => {
    const enteredSearchInput = searchInputRef.current.value;
    props.search.setSearch(enteredSearchInput);
    props.filter.setSearchFilter(filterData);

    props.submit.setSubmit(!props.submit.submit);
    // Clear input after submit
    searchInputRef.current.value = "";
    setFilterData({});
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "80vw",
      }}
      onSubmit={(event) => {
        event.preventDefault();
        searchBtnHandler();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter a movie..."
        inputProps={{ "aria-label": "search ..." }}
        inputRef={searchInputRef}
      />
      <IconButton
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={searchBtnHandler}
      >
        <SearchIcon />
      </IconButton>
      <Divider
        sx={{ m: 0.5 }}
        orientation="vertical"
        style={{ height: "2rem" }}
      />
      <IconButton
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={() => setModalShow(true)}
      >
        <FilterAltOutlinedIcon />
      </IconButton>
      <SearchFilter
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={{ setFilterData }}
      />
    </Paper>
  );
}
