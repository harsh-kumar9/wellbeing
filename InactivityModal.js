import React from 'react';
import { Modal, Button } from '@mui/material';

const InactivityModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content">
        <h2>Still there?</h2>
        <p>Please ensure you are engaging with the chatbots for the entire duration of this experiment.</p>
        <Button onClick={handleClose} variant="contained">OK</Button>
      </div>
    </Modal>
  );
};

export default InactivityModal;
