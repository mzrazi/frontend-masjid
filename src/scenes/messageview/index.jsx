import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";

import { DeleteOutline } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";


const Messageview = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState([]);
  const Navigate = useNavigate();

  const  handleDeleteMessage= async (id) => {
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/delete-message/${id}`, {method: "DELETE"});
        localStorage.setItem("messagealert", JSON.stringify({ message: "message deleted successfully", type: "success" }));
     Navigate('/messages')
    } catch (error) {
      localStorage.setItem("messagealert", JSON.stringify({ message: "message delete error", type: "error" }));
        console.error(error);
    }
};
  const {id}= useParams()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/view-message/${id}`);
        const data = await response.json();
        
        setMessage(data.message); // update to access the "messages" key
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    

    fetchMessages();
  }, [id]);

 

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" component="h1">
        Message
      </Typography>
      {isLoading ? (
        <Typography>Loading messages...</Typography>
      ) : (
        <List sx={{ mt: 2 }}>
          
            <ListItem key={message._id} disablePadding>
  <ListItemText
    primaryTypographyProps={{
      component: "div",
      sx: { fontWeight: "bold", lineHeight: "1.3em" },
    }}
    secondaryTypographyProps={{
      sx: { color: theme.palette.text.secondary },
    }}
    primary={
      <>
        {message.title}
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
          {`from: ${message.useremail}`}
        </Typography>
      </>
    }
    secondary={message.message}
    sx={{
      border: "1px solid",
      borderColor: theme.palette.grey[300],
      borderRadius: "8px",
      p: 2,
      "&:hover": {
        borderColor: theme.palette.primary.main,
      },
    }}
  />
  <IconButton
                aria-label="delete message"
                onClick={ () => {
                  if (window.confirm("Are you sure you want to delete this message?")) {
                   
                      handleDeleteMessage(message._id);
                  }
              }}
              >
               <DeleteOutline/>
              </IconButton>
</ListItem>

          
        </List>
      )}
    </Box>
  );
};

export default Messageview;
