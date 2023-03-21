import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 200,
    valueGetter: (params) => `${params.row.FirstName} ${params.row.LastName}`,
  },
  { field: "Address", headerName: "Address", width: 200 },
  { field: "Email", headerName: "Email", width: 200 },
  { field: "Phone", headerName: "Phone", width: 200 },
  {
    field: "Members",
    headerName: "Members",
    width: 100,
    valueGetter: (params) => params.row.Family?.length ?? 0
  },
  {
    field: "ViewMembers",
    headerName: "View Members",
    width: 150,
    renderCell: (params) => (
      <Button
        component={Link}
        to={`/members/${params.row._id}`}
        variant="contained"
        color="primary"
      >
        View
      </Button>
    )
  },
  {
    field: "payments",
    headerName: "view payments",
    width: 150,
    renderCell: (params) => (
      <Button
      component={Link}
      to={`/payments/${params.row._id}`}
      variant="contained"
      color="primary"
      >
        View
      </Button>
    )
  }

  
  
  
  
];

const Families = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/all-users`);
      const data = await res.json();
     
      // Add id field to data
      const usersWithId = data.map((user, index) => ({ id: index + 1, ...user, Members: user.Family.length }));
      setUsers(usersWithId);
      setSearchedUsers(usersWithId);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.LastName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchedUsers(filteredUsers);
  }, [users, searchInput]);

  return (
    
    <div style={{ height: 600, width: "98%",marginLeft:"20px" }}>
      <DataGrid
  rows={searchedUsers}
  columns={columns}
  components={{
    Toolbar: (props) => (
      <DataGridCustomToolbar {...props} searchInput={searchInput} setSearchInput={setSearchInput} />
    ),
  }}
  disableSelectionOnClick
/>

    </div>
  );
};

export default Families;
