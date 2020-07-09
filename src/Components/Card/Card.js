import React from 'react';
import './Card.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Grid } from '@material-ui/core';

import savedEmpty from '../images/savedEmpty.png';
import star from '../images/star.png';
import unschedule from '../images/unschedule.png';

const defaultProps = {
  style: {
    width: '260px',
    height: '290px',
    borderRadius: '20px'
  }
};

export default function MediaCard() {
  return (
    <Card borderRadius='50%' {...defaultProps} className='card'>
      <CardActionArea className='area'>
        <CardMedia
          className='CardImage'
          image={
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
          }
        />
        <h1 className='Cardtitle'>bancake</h1>
        <Grid className='starsCard'>
          <img alt='star' className='Cardstar' src={star} />
          <img alt='star' className='Cardstar' src={star} />
          <img alt='star' className='Cardstar' src={star} />
          <img alt='star' className='Cardstar' src={star} />
          <img alt='star' className='Cardstar' src={star} />
        </Grid>

        <Typography>
          <CardActions className='Cardactions'>
            <IconButton className='expandOpen1'>
              <img alt='saveicone' className='saveCard' src={savedEmpty} />
            </IconButton>
            <IconButton className='expandOpen2'>
              <img
                alt='unscheduleicone'
                className='unscheduleCard'
                src={unschedule}
              />
            </IconButton>
          </CardActions>
        </Typography>
      </CardActionArea>
    </Card>
  );
}
