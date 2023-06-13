import * as React from 'react';
import PropTypes from 'prop-types';
import MuiModal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button } from '../atoms/Button';

export const Modal = ({ description, children, onClose, open, onSubmit, disabled }) => {

  const CardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 390,
  };

  const CardActionsStyle = {
    justifyContent: 'flex-end', 
    marginTop: 45,
    padding: 0,
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
    >
      <Card style={CardStyle}>
        <CardHeader title={<h4 style={{margin: 0}}>{description}</h4>}>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardActions style={CardActionsStyle}>
          <Button
            variant='outlined'
            color='primary'
            onClick={onClose}
          >
            Anuluj
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={onSubmit}
            disabled={disabled}
          >
            Zapisz
          </Button>
        </CardActions>
      </Card>
    </MuiModal>
  );
};

Modal.propTypes = {
  description: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool
};