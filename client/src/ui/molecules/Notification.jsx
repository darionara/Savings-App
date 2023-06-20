import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
//import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
//import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function SlideRightTransition(props) {
  return <Slide {...props} direction='right' />;
}

export const Notification = ({ open, handleClose, message}) => {
  
  /* to be continued ;) */

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      TransitionComponent={SlideRightTransition}
    />
  )
};

Notification.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string
}