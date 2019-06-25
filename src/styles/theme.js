import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: {
      main: '#333'
    },
    secondary: {
      main: '#81b71a'
    },
    success: {
      main: '#2d72ac'
    },
    info: {
      main: '#9933CC'
    },
    warning: {
      main: '#e37e1b'
    },
    danger: {
      main: '#da4738'
    },
    text: {
      primary: '#333'
    },
    background: {
      default: '#EAEAEA',
      dark: '#172B4D'
    },
    border: '#cccccc',
    divider: '#cccccc'
  },
  props: {
    MuiTextField: {
      fullWidth: true,
      variant: 'outlined',
      margin: 'dense'
    },
    MuiInputLabel: {
      shrink: true
    }
  }
});

export default theme;
