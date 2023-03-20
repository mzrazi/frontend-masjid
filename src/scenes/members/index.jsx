import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Members = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const { id } = useParams();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/user-members/${id}`);
        const data = await response.json();
        const membersWithId = data.members.map((member, index) => ({ ...member, id: index + 1 }));
        setMembers(membersWithId);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const columns = [
    {
      field: "Firstname",
      headerName: "First Name",
      width: 500
    },
    {
      field: "Lastname",
      headerName: "Last Name",
      width: 350
    },
    {
      field: "Age",
      headerName: "Age",
      width: 200
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 150
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="MEMBER DETAILS"
        subtitle="Track your member's details here"
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
        <DataGrid
          loading={isLoading}
          rows={members}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Members;

