import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Header from "components/Header";
import CustomAlertBox from "components/customAlertBox";


const SendNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState("all");
  
  const [allUsers, setAllUsers] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/all-users`)
      .then((response) => response.json())
      .then((data) => setAllUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/send-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title,message, selectedUsers }),
      });
      const data = await response.json();
      setTitle("")
      setMessage("")
      setSelectedUsers("all")
      setAlert({ type: "success", message: "notification send successfully!" });
     
    } catch (error) {
      setAlert({ type: "error", message: "Error sending notification" });
      console.error(error);
    }
  };
  
  const handleCloseAlert = () => {
    setAlert(null);
  };

  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SEND NOTIFICATION" subtitle="Send a notification to users" />




      <div className="container mt-5">
      {alert && (
          <CustomAlertBox
            message={alert.message}
            type={alert.type}
            onClose={handleCloseAlert}
          />
        )}



        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              placeholder="Enter Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              fullWidth
              margin="normal"
              style={{ marginBottom: "1rem" }}
            />
          </div>

          <div className="form-group">
            <TextField
              label="Message"
              variant="outlined"
              name="message"
              placeholder="Enter Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              fullWidth
              margin="normal"
              multiline
              rows={3}
              style={{ marginBottom: "1rem" }}
            />
          </div>

          <div className="form-group">
            <FormControl variant="outlined" fullWidth margin="normal" style={{ marginBottom: "1rem" }}>
              <InputLabel id="users-label">Select users</InputLabel>
              <Select
                labelId="users-label"
                id="users"
                value={selectedUsers}
                onChange={(event) => setSelectedUsers(event.target.value)}
                label="Select users"
              >
                <MenuItem value="all">All users</MenuItem>
                {allUsers.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.FirstName} {user.LastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send notification
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default SendNotification;