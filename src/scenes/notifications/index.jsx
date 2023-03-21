import React, { useState, useEffect } from "react";
import { Box, useTheme,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {Link} from "react-router-dom";

import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Notifications = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/admin-notifications`);
        const data = await response.json();
        const notificationsWithId = data.notifications.map((notification, index) => ({ ...notification, id: index + 1 }));
        setNotifications(notificationsWithId);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [])

  const handleDelete = async (id) => {
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/delete-notification/${id}`, {method: "DELETE"});

      window.location.reload()
    } catch (error) {
        console.error(error);
    }
};

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 400
    },
    {
      field: "message",
      headerName: "Description",
      width: 500
    },
    {
      field: "createdAt",
      headerName: "Date and Time",
      width: 200
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="warning"
        onClick={
            () => {
                if (window.confirm("Are you sure you want to delete this notification?")) {
                 
                    handleDelete(params.row._id);
                }
            }
    }>
        Delete
    </Button>
      )
    },
   
    
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Notifications"
        subtitle="Track your events notifications here"
      />

     

      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
         <div className="">
                    <Link className="linkbutton" to="/sendnotification">
                        <Button variant="contained" color="primary">
                            send Notification
                        </Button>
                    </Link>
                </div>



                <br />
        <DataGrid
          loading={isLoading}
          rows={notifications}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Notifications;