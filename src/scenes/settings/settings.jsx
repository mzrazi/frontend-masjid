import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import CustomAlert from "components/CustomAlert";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
const [usernameChanged, setUsernameChanged] = useState(false);
const [error, setError] = useState(false);
const [errorMessage, setErrormessage] = useState();
const [showNewPassword, setShowNewPassword] = useState("");
const [showCurrentPassword, setShowCurrentPassword] = useState("");

const handleChangePassword = () => {
    setPasswordChanged("false")
    setError(false)
    const userId = localStorage.getItem("userId");
    fetch('http://localhost:3000/admin/change-admin-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        currentPassword,
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
        setCurrentPassword("")
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        setPasswordChanged(false);
        setError(true);
        setConfirmNewPassword("")
        setNewPassword("")
        setCurrentPassword("")
      });
  };
  
  const handleChangeUsername = () => {
    setUsernameChanged(false)
    setError(false)
    const userId = localStorage.getItem("userId");
    fetch('http://localhost:3000/admin/change-admin-username/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        username,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setUsernameChanged(true);
          setError(false);
        } else {
          throw new Error('Error changing username.');
        }
      })
      .catch((error) => {
        console.error('Error changing username:', error);
        setUsernameChanged(false);
        setError(true);
      });
    setUsername("")
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
    {usernameChanged && (
      <CustomAlert
        successMessage="Username changed successfully!"
        onClose={() => setUsernameChanged(false)}
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
          Change Password
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="current-password">Current Password</InputLabel>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <Button variant="outlined" size="small">
            //       Forgot?
            //     </Button>
            //   </InputAdornment>
            // }
            endAdornment={
              <InputAdornment position="end">
                <Button variant="outlined" size="small" color="inherit" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? "Hide" : "Show"} 
                </Button>
              </InputAdornment>
            }
            
          />
        </FormControl>

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

      <Divider sx={{ mb: "2rem" }} />

      {/* Change Username */}
      <Box>
        <Typography variant="h6" component="h2" mb="1rem">
          Change Username
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="username"
            label="New Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <Button variant="contained" onClick={handleChangeUsername}>
          Change Username
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
