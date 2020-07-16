import React, { Component } from 'react';
import Card from '../Card/Card';
import './Explore.css';
import { AppBar, Toolbar, Grid, Button, Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import logo from '../images/logo2.png';
import history from '../../History';
import { createMuiTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#3A3A3A',
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
const Explore = () => {
  let history = useHistory();

  function handleClick() {
    history.push('/signup');
  }

  function handleClick2() {
    history.push('/');
  }
  return (
    <Grid className='ExploreContaner1'>
      <ThemeProvider theme={theme}>
        <AppBar color='primary'>
          <Toolbar>
            <Grid>
              <img onClick={handleClick2} src={logo} className='Logo' />
            </Grid>
            <Grid item sm={11} xs={9} />
            <Button
              className='ExploreSignUpButton'
              onClick={handleClick}
              color='secondary'
            >
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <h1
        style={{
          marginTop: 80,
          textAlign: 'left',
          marginLeft: 60,
          marginBottom: 8,
          fontFamily: 'arial',
          color: '#59595c',
          fontSize: 25
        }}
      >
        recipes:
      </h1>
      <Card history={history} />
    </Grid>
  );
};
export default Explore;
