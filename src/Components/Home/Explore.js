import React from 'react';
import Card from './Card';
import './Explore.css';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import logo from '../images/logo.png';

const Explore = () => {
  return (
    <Grid className='ExploreContaner'>
      <AppBar position='static'>
        <Toolbar>
          <Grid className='GridExploreBar'>
            <img src={logo} className='exploreLogo' />
          </Grid>
          <Grid item sm={11} xs={6} />

          <Button className='ExploreSignUpButton'>SignUp</Button>
        </Toolbar>
      </AppBar>
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
