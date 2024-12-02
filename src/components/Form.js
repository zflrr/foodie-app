import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Modal, IconButton, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ItemsContext from '../store/ItemsContext';

const Form = ({ open, handleClose, setAlert }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const { addItem } = useContext(ItemsContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 400,
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      console.log('Image file selected:', file.name, file.type, file.size);
    } else {
      console.log('No file selected');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    
    try {
      const mealData = {
        title: title,
        desc: desc,
        price: parseFloat(price)
      };

      const addedMeal = await addItem(mealData, imageFile);
      if (addedMeal) {
        console.log('Meal added successfully:', addedMeal);
        setAlert({ open: true, message: 'Meal added successfully!', severity: 'success' }); 
        handleClose();
        setTitle('');
        setDesc('');
        setPrice('');
        setImageFile(null);
      } else {
        console.error('Error adding meal');
        setAlert({ open: true, message: 'Error adding meal. Please try again.', severity: 'error' }); 
      }
    } catch (error) {
      console.error('Error:', error.message);
      setAlert({ open: true, message: 'An unexpected error occurred.', severity: 'error' }); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          Add New Meal
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Meal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            multiline
            rows={3}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
              Upload Image
            </Button>
          </label>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={loading} 
              sx={{ position: 'relative' }}
            >
              {loading ? <CircularProgress size={24} sx={{ position: 'absolute' }} /> : 'Add Meal'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Form;