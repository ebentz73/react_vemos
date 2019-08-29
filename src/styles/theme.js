import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: {
      main: '#1f1f1f',
      contrastText: '#fff'
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
      default: '#eaeaea',
      dark: '#172B4D'
    },
    border: '#cccccc',
    divider: '#cccccc'
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontWeight: 300
    },
    h2: {
      fontWeight: 300
    },
    h3: {
      fontWeight: 300
    },
    h4: {
      fontWeight: 300
    },
    h5: {
      fontWeight: 300
    },
    h6: {
      fontWeight: 300
    },
    body1: {
      fontWeight: 400
    },
    button: {
      fontSize: '15px',
      textTransform: 'none'
    }
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
  },
  overrides: {
    MUIDataTableFilter: {
      root: {
        fontFamily: 'Open Sans, sans-serif'
      }
    },
    MuiAppBar: {
      root: {
        zIndex: defaultTheme.zIndex.drawer + 1
      }
    },
    MuiMenu: {
      list: {
        minWidth: '220px'
      }
    },
    MuiGridListTile: {
      tile: {
        overflow: 'visible'
      }
    },
    MUIDataTableBodyCell: {
      cellStacked: {
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '12px'
        }
      },
      responsiveStacked: {
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: '12px'
        }
      }
    }
  }
});

export default theme;
