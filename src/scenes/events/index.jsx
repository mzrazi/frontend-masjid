import React, { useState, useEffect } from "react";
import { Box, useTheme,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {Link} from "react-router-dom";

import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import CustomAlertBox from "components/customAlertBox";



const Events = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState(null);
  

 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/eventsview`);
        const data = await response.json();
        const eventsWithId = data.events.map((event, index) => ({ ...event, id: index + 1 }));
        setEvents(eventsWithId);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
       // Get the alert message from the localStorage object
       const alertMessage = JSON.parse(localStorage.getItem("alert"));
       if (alertMessage) {
         setAlert(alertMessage);
         // Remove the alert message from the localStorage object
         localStorage.removeItem("alert");
       }
  
    fetchData();
  }, [])

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/delete-event/${id}`, {method: "DELETE"});
      setAlert({ message: "event deleted successfully", type: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setAlert({ message: "Error deleting event", type: "error" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.error(error);
    }
  };
  

  const columns = [
    {
      field: "title",
      headerName: "Event",
      width: 300
    },
    {
      field: "description",
      headerName: "Description",
      width: 350
    },
    {
      field: "date",
      headerName: "Date",
      width: 100
    },
    {
      field: "imagePath",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="" width="50" height="50" />
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
    {
      field: "edit",
      headerName: "edit",
      width: 150,
      renderCell: (params) => (
        <Link className="linkbutton" to={`/editevents/${params.row._id}`}>
          <Button variant="contained" color="success">
            Edit
          </Button>
        </Link>
      )
    }
    
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Events"
        subtitle="Track your events details here"
      />

{alert && ( // Render the alert message if it exists
          <CustomAlertBox
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}

     

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
                    <Link className="linkbutton" to="/addevents">
                        <Button variant="contained" color="primary">
                            Add event
                        </Button>
                    </Link>
                </div>



                <br />
        <DataGrid
          loading={isLoading}
          rows={events}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Events;