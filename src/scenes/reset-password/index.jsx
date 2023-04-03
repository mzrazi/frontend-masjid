import React, { useState } from "react";
import {
  Box,
  Button,
  
  FormControl,
  Input,
  InputAdornment,
  InputLabel,

  Typography,
} from "@mui/material";

import CustomAlert from "components/CustomAlert";
import { useParams } from "react-router-dom";

const Resetpassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordChanged, setPasswordChanged] = useState(false);
const [error, setError] = useState(false);
const [errorMessage, setErrormessage] = useState();
const [showNewPassword, setShowNewPassword] = useState("");
const {resetToken}= useParams()
const handleChangePassword = () => {

    
    setPasswordChanged("false")
    setError("false")
    
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reset-password/${resetToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword,
        confirmNewPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Password changed successfully', response);
          setPasswordChanged(true);
          setError(false);
        } else {
          console.error('Error changing password:', response);
          setPasswordChanged(false);
          setError(true);
        }
        setConfirmNewPassword("")
        setNewPassword("")
       
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        setPasswordChanged(false);
        setError(true);
        setConfirmNewPassword("")
        setNewPassword("")
   
      });
  };
 
  

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" component="h1" mb="2rem">
        Settings
      </Typography>
      {passwordChanged && (
      <CustomAlert
        successMessage="Password changed successfully!"
        onClose={() => setPasswordChanged(false)}
      />
    )}
  
    {error && (
      <CustomAlert
        errorMessage={
          errorMessage
            ? errorMessage
            : 'An error occurred. Please try again later.'
        }
        onClose={() => setError(false)}
      />
    )}

      {/* Change Password */}
      <Box mb="2rem">
        <Typography variant="h6" component="h2" mb="1rem">
          Reset Password
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel htmlFor="new-password">New Password</InputLabel>
  <Input
    id="new-password"
    type={showNewPassword ? "text" : "password"} // use state to toggle the input type
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    endAdornment={
      <InputAdornment position="end">
        <Button variant="outlined" size="small" color="inherit" onClick={() => setShowNewPassword(!showNewPassword)}>
          {showNewPassword ? "Hide" : "Show"} 
        </Button>
      </InputAdornment>
    }
  />
</FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="confirm-new-password">
            Confirm New Password
          </InputLabel>
          <Input
            id="confirm-new-password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </FormControl>

        <Button variant="contained" onClick={handleChangePassword}>
          Change Password
        </Button>
      </Box>
      </Box>
  );
};

export default Resetpassword;
