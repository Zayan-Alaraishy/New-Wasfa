import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import history from '../../History';

import './Home.css';
import HomeImg from '../images/Home (1).png';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

const useStyles = makeStyles(theme => ({
  HomeButton: {
    right: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59595c',
    fontStyle: 'normal'
  },
  HomeExplore: {
    position: 'absolute',
    flexDirection: 'column',
    top: 450,
    left: 150,
    border: 'none',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: ' #3a3a3a'
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className='HomeContanier'>
      <Grid
        className='HomeGrid'
        item
        container
        direction='row-reverse'
        justify='flex-start'
        alignItems='flex-start'
      >
        <ThemeProvider theme={theme}>
          <Button color='primary' className={classes.HomeButton}>
            Log in
          </Button>
          <text className='HomeButton1'>|</text>
          <Button color='primary' className={classes.HomeButton}>
            Sign Up
          </Button>
          <text className='HomeButton2'>|</text>
          <Button color='primary' size='large' className={classes.HomeButton}>
            About us
          </Button>
        </ThemeProvider>
      </Grid>

      <h1 className='HomeWasfa'>Wasfa</h1>
      <div className='WasfaP'>
        <p className='WasfaP1'>A recipe web app for learners</p>
        <p className='WasfaP2'>to get recipes easily and</p>
        <p className='WasfaP3'>cheves to share theirs </p>
      </div>
      <Button
        onClick={() => history.push('/explore')}
        color='primary'
        className={classes.HomeExplore}
      >
        Explore now
      </Button>

      <img className='ImageHome' src={HomeImg} />
    </div>
  );
};
export default Home;
