import React from 'react';
import { Grid } from '@material-ui/core';
import './Home.css';
import HomeImg from '../images/Home (1).png';

const Home = () => {
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
        <button className='HomeButton'> Log in</button>
        <text className='HomeButton'>|</text>
        <button className='HomeButton'> Sign Up</button>
        <text className='HomeButton'>|</text>
        <button className='HomeButton'> About us</button>
      </Grid>

      <img className='ImageHome' src={HomeImg} />
      <h1 className='HomeWasfa'>Wasfa</h1>
      <div className='WasfaP'>
        <p className='WasfaP1'>A recipe web app for learners</p>
        <p className='WasfaP2'>to get recipes easily and</p>
        <p className='WasfaP3'>cheves to share theirs </p>
      </div>
      <button className='HomeExplore'>Explore now</button>
    </div>
  );
};
export default Home;
