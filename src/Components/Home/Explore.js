import React from 'react';
import Card from '../Card/Card';
import './Explore.css';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import logo from '../images/logo.png';
import history from '../../History';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#59595c',
      dark: '#757ce8',
      contrastText: '#757ce8'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
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
            <Grid className='GridExploreBar'>
              <img src={logo} className='exploreLogo' />
            </Grid>
            <Grid item sm={11} xs={6} />

            <Button
              className='ExploreSignUpButton'
              onClick={() => history.push('/tutorial')}
            >
              SignUp
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Grid>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </Grid>
  );
};

export default Explore;
