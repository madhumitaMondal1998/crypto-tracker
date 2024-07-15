import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, Button, TextField } from '@mui/material';
import { setSymbol } from '../redux/slices/dataSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ChangeSymbolModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeSymbol = () => {
    dispatch(setSymbol(newSymbol.toUpperCase()));
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Change Symbol
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            label="Symbol"
            variant="outlined"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleChangeSymbol} sx={{ mt: 2 }}>
            Change
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangeSymbolModal;
