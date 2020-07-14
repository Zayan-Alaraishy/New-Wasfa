import React, { Component } from 'react';
import Card from '../Card/Card';
import './Explore.css';
import { AppBar, Toolbar, Grid, Button, Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import logo from '../images/logo2.png';
import history from '../../History';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757CE8',
      main: '#3A3A3A',
      dark: '#757CE8',
      contrastText: '#757CE8'
    },
    secondary: {
      light: '#FF7961',
      main: '#fff',
      dark: '#BA000D',
      contrastText: '#000'
    }
  }
});
const Explore = () => {
  return (
    <Grid className='ExploreContaner1'>
      <ThemeProvider theme={theme}>
        <AppBar color='primary'>
          <Toolbar>
            <Grid>
              <img src={logo} className='Logo' />
            </Grid>
            <Grid item sm={11} xs={9} />
            <Button
              className='ExploreSignUpButton'
              onClick={() => history.push('/tutorial')}
              color='secondary'
            >
              SignUp
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {/* <text>Cheack our recipes :)</text> */}
      <h1>All recipes</h1>
      <Card />
      <Card />
    </Grid>
  );
};
export default Explore;
