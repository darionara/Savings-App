import { MaterialDesignContent } from 'notistack';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const StyledSnackbar = styled(MaterialDesignContent)((theme) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main,
    iconVariant: <CheckCircleOutlineIcon />
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
    iconVariant: <ErrorOutlineIcon />
  },
}));
