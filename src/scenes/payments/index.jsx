import React, { useState, useEffect } from "react";
import { Box, useTheme,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {useParams} from "react-router-dom";

import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Events = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState([]);
 const {id}=useParams()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/user-payments/${id}`);
        const res = await response.json();
       
        const data=res.paymentsWithMonthName
        const user=res.user
        
       
        const paymentsWithId = data.map((payment, index) => ({ ...payment, id: index + 1 }));
        setPayments(paymentsWithId);
        setIsLoading(false);
        setUser(user)
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id])

 
const updatePaymentStatus = (paymentId, status) => {
    // call API to update payment status
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/change-status/${paymentId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update payment status");
        }
        window.location.reload();

      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100
    },
    {
      field: "month",
      headerName: "Month",
      width: 200
    },
    {
      field: "year",
      headerName: "Year",
      width: 200
    },
    {
        field: "status",
        headerName: "Status",
        width: 200
      },

    {
        field: "actions",
        headerName: "Actions",
        width: 400,
        renderCell: (params) => (
          <div>
            {params.row.status !== "paid" && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() =>updatePaymentStatus(params.row._id, "paid")}
              >
                Paid
              </Button>
            )}
            {params.row.status !== "pending" && (
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "10px" }}
                onClick={() =>
                  updatePaymentStatus(params.row._id, "pending")
                }
              >
                Pending
              </Button>
            )}
            {params.row.status !== "due" && (
              <Button
                variant="contained"
                color="info"
                style={{ marginRight: "10px" }}
                onClick={() =>updatePaymentStatus(params.row._id, "due")}
              >
                Due
              </Button>
            )}
          </div>
        ),
      },
      
    
  ];


  return (

    
    <Box m="1.5rem 2.5rem">
        <Header
        title="Payment status"
        subtitle={`${user.FirstName} ${user.LastName}`}
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
         {/* <div className="">
                    <Link className="linkbutton" to="/addevents">
                        <Button variant="contained" color="primary">
                            Add event
                        </Button>
                    </Link>
                </div> */}



                <br />
        <DataGrid
          loading={isLoading}
          rows={payments}
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