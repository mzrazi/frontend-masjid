import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomAlertBox from "components/customAlertBox";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";



const Message= () => {
  // const [users, setUsers] = useState([]);
  // const [searchInput, setSearchInput] = useState("");
  // const [searchedUsers, setSearchedUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/messages`);
        const data = await response.json();
        console.log(data);
        const messagesWithId = data.messages.map((message, index) => ({ ...message, id: index + 1 }));

        
        setMessages(messagesWithId); // update to access the "messages" key
        const alertMessage = JSON.parse(localStorage.getItem("messagealert"));
        if (alertMessage) {
          setAlert(alertMessage);
          // Remove the alert message from the localStorage object
          localStorage.removeItem("messagealert");
        }

       
      } catch (error) {
        console.error(error);
       
      }
    };
    

    fetchMessages();
  }, []);

  const  handleDelete= async (id) => {
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/delete-message/${id}`, {method: "DELETE"});
        setAlert({ message: "message deleted successfully", type: "success" });
        setTimeout(() => {
          window.location.reload();
         
        }, 1000);
      
    } catch (error) {
      setAlert({ message: "Error deleting message", type: "error" });
      setTimeout(() => {
        window.location.reload();
       
      }, 1000);
    
        console.error(error);
    }
};
  
  


  const columns= [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "fullname",
      headerName: "Username",
      width: 200,
     
    },
    
    { field: "useremail", headerName: "Email", width: 250 },
   
    {
      field: "title",
      headerName: "Subject",
      width: 200,
    
    },
    { field: "createdAt", headerName: "Date & Time", width: 250 },
    {
      field: "ViewMessage",
      headerName: "View message",
      width: 150,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/view-message/${params.row._id}`}
          variant="contained"
          color="primary"
        >
          View
        </Button>
      )
    },
    {
      field: "delete",
      headerName: "delete",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="warning"
        onClick={
            () => {
                if (window.confirm("Are you sure you want to delete this event?")) {
                 
                    handleDelete(params.row._id);
                }
            }
    }>
        Delete
    </Button>
      )
    },
  
    
    
    
    
  ];

  // useEffect(() => {
  //   const filteredUsers = users.filter((user) =>
  //     user.LastName.toLowerCase().includes(searchInput.toLowerCase())
  //   );
  //   setSearchedUsers(filteredUsers);
  // }, [users, searchInput]);

  return (
    
    <div style={{ height: 600, width: "98%",marginLeft:"20px" }}>
       {alert && ( // Render the alert message if it exists
          <CustomAlertBox
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
      <DataGrid
  rows={messages}
  columns={columns}

  disableSelectionOnClick
/>

    </div>
  );
};

export default Message;