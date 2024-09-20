import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { X } from 'lucide-react';

const CryptoModal = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="crypto-modal-title"
      aria-describedby="crypto-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
          maxWidth: '500px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="crypto-modal-title" variant="h6" component="h2" sx={{ color: '#30C0BF', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton onClick={onClose} aria-label="close" sx={{ color: '#30C0BF' }}>
            <X />
          </IconButton>
        </Box>
        <Box id="crypto-modal-description" sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CryptoModal;