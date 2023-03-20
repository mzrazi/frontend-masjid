import React, { useState } from 'react';
import Modal from '@mui/material/Modal'
import { Typography } from '@mui/material';

const CustomAlert = ({ successMessage, errorMessage, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-container">
        <Typography variant="h5" color="primary">
          {successMessage && <p>{successMessage}</p>}
        </Typography>
        <Typography variant="h5" color="error">
          {errorMessage && <p>{errorMessage}</p>}
        </Typography>
        <button onClick={handleClose}>Close</button>
      </div>
    </Modal>
  );
};

export default CustomAlert;
