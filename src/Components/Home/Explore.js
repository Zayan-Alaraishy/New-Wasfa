import React from 'react';
import Card from '../Card/Card';
import './Explore.css';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import logo from '../images/logo2.png';
import history from '../../History';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3a3a3a',
      dark: '#757ce8',
      contrastText: '#757ce8'
    },
    secondary: {
      light: '#ff7961',
      main: '#fff',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});
const Explore = () => {
  return (
    <Grid className='ExploreContaner'>
      <ThemeProvider theme={theme}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Grid>
              <img src={logo} className='Logo' />
            </Grid>
            <Grid item sm={11} xs={6} />

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
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Grid>
  );
};

export default Explore;
