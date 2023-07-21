import { MaterialDesignContent } from 'notistack';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StyledSnackbar = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
  },
}));

const SuccessIcon = () => <CheckCircleOutlineIcon style={{ marginRight: '8px' }}/>;
const ErrorIcon = () => <ErrorOutlineIcon style={{ marginRight: '8px' }}/>;

export { StyledSnackbar, SuccessIcon, ErrorIcon };