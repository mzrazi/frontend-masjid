import React from "react";
import { Alert } from "@mui/material";

const CustomAlertBox = ({ message, type, onClose }) => {
  return (
    <Alert severity={type} onClose={onClose} sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};

export default CustomAlertBox;
