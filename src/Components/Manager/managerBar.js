import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Grid } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import logo from '../images/logo2.png';
import user from '../images/user.png';
import userblack from '../images/userblack.png';
import savedFull from '../images/savedFull.png';
import recipe from '../images/recipe (1).png';
import calendar from '../images/calendar.png';
import logout from '../images/logout.png';
import arrow from '../images/arrow.png';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#3a3a3a',
      dark: '#ffffff',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff'
    }
  }
});

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'secondary'
  },
  inputRoot: {
    color: 'secondary'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: 'secondary',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const ManagerBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid className='ExploreContaner'>
      <ThemeProvider theme={theme}>
        <AppBar color='primary'>
          <Toolbar>
            <Grid>
              <img src={logo} className='Logo' />
            </Grid>
            <h1>Chefs requests</h1>

            <img onClick={handleMenu} src={user} className='chef' />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Grid>
  );
};
export default ManagerBar;
