import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, color }) => ({
  '&.MuiButton-contained': {
    ...(color==='error' && {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.main,
      '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: '#fff',
      },
      '&:disabled': {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.grey.main,
      },
    }),
    ...(color==='success' && {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.main,
      '&:hover': {
      backgroundColor: theme.palette.success.main,
      color: '#fff', 
      },
      '&:disabled': {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.grey.main,
      },
    }),
    ...(color==='warning' && {
      backgroundColor: theme.palette.warning.light,
      color: '#B28C09',
      '&:hover': {
      backgroundColor: theme.palette.warning.main, 
      color: '#fff',
      },
      '&:disabled': {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.grey.main,
      },
    }),
  },
  '&.MuiButton-outlined': {
    ...(color==='primary' && {
      backgroundColor: theme.palette.secondary.main,
      border: 'none',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark, 
      },
      '&:disabled': {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.grey.main,
      },
    }),
    ...(color==='error' && {
      backgroundColor: '#fff',
      borderColor: theme.palette.error.main,
      '&:hover, :active': {
      backgroundColor: '#FDE8E0', 
      },
      '&:disabled': {
        backgroundColor: '#fff',
        color: theme.palette.grey.main,
        borderColor: theme.palette.grey.light,
      },
    }),
    ...(color==='success' && {
      backgroundColor: '#fff',
      borderColor: '#66BB6A',
      '&:hover, :active': {
      backgroundColor: theme.palette.success.light, 
      },
      '&:disabled': {
        backgroundColor: '#fff',
        color: theme.palette.grey.main,
        borderColor: theme.palette.grey.light,
      },
    }),
    ...(color==='warning' && {
      backgroundColor: '#fff',
      borderColor: theme.palette.warning.main,
      '&:hover, :active': {
      backgroundColor: theme.palette.warning.light, 
      },
      '&:disabled': {
        backgroundColor: '#fff',
        color: theme.palette.grey.main,
        borderColor: theme.palette.grey.light,
      },
    }),
  },
}))

export function Button({children, ...restProps}) {
  return <StyledButton {...restProps}>{children}</StyledButton>
}

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'outlined']),
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  color: PropTypes.oneOf(['primary', 'error', 'success', 'warning']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}