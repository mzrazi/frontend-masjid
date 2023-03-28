import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import {Link} from "react-router-dom";


import { Button } from "@mui/material";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  
const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "FirstName",
      headerName: "First Name",
      width: 150,
   
    },
    {
      field: "LastName",
      headerName: "Last Name",
      width: 150,
      
    },
    { field: "Address", headerName: "Address", width: 200 },
    { field: "Email", headerName: "Email", width: 150 },
    { field: "Phone", headerName: "Phone", width: 200 },
    {
      field: "delete",
      headerName: "delete",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="warning"
        onClick={
            () => {
                if (window.confirm("Are you sure you want to delete this user?")) {
                 
                    handleDelete(params.row._id);
                }
            }
    }>
        Delete
    </Button>
      )
    },
    {
      field: "edit",
      headerName: "edit",
      width: 150,
      renderCell: (params) => (
        <Link className="linkbutton" to={`/edit-user/${params.row._id}`}>
          <Button variant="contained" color="success">
            Edit
          </Button>
        </Link>
      )
    } 
  
    
    
    
    
  ];

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
    user.FirstName.toLowerCase().startsWith(searchInput.toLowerCase()) ||
    user.LastName.toLowerCase().startsWith(searchInput.toLowerCase())
  );
  
    console.log(filteredUsers);
    setSearchedUsers(filteredUsers);
  }, [users, searchInput]);

  const handleDelete = async (id) => {
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/delete-user/${id}`, {method: "DELETE"});

      window.location.reload()
    } catch (error) {
        console.error(error);
    }
};

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

export default Users;
