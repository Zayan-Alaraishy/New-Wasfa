import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Button, InputBase } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo2.png';
import history from '../../History';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  typographyStyle: {
    flex: 1
  },
  iconStyle: {
    flex: 1
  },
  logo: {
    height: 40,
    width: 'auto'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: 'solid',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '60%',
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
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#3a3a3a',
      dark: '#fff',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#fff',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});
const ChefBar2 = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Grid container direction='row'>
            <img
              src={require('../images/logo2.png')}
              style={{ width: 'auto', height: 74, padding: 0 }}
            />
            <SearchBar
              placeholder='Search for a meal'
              value={search}
              onChange={e => setSearch(e.target.value)}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                margin: 19,
                maxWidth: 1000,
                maxHeight: 40,
                color: '#bbb'
              }}
            />
            <SearchBar
              placeholder='Search for a meal'
              value={search}
              onChange={e => setSearch(e.target.value)}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                margin: 19,
                maxWidth: 1000,
                maxHeight: 40,
                color: '#bbb'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h2 style={{ fontSize: 20, fontFamily: 'arial', marginTop: 25 }}>
                Categories
              </h2>
              <ArrowDropDownIcon
                style={{ marginTop: 15, width: 50, height: 50 }}
              />
            </div>
          </Grid>

          <Grid item sm={11} xs={6} />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default ChefBar2;
