import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const [searchText, setSearchText] = useState(searchInput);

  const handleSearch = () => {
    setSearchInput(searchText);
  };

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarDensitySelector />
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;

