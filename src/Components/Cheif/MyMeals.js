import React, { Component, useState, useContext, useEffect } from 'react';
import { firebase } from '../../firebase';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Grid } from '@material-ui/core';
import star from '../images/star.png';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

import savedEmpty from '../images/savedEmpty.png';
import unschedule from '../images/unschedule.png';
import { AuthContext } from '../../Auth';
import ChefBar from './chefBar';

const defaultProps = {
  style: {
    width: '260px',
    height: '290px',
    borderRadius: '20px',
    marginLeft: '55px'
  }
};
export default function MyMeals() {
  const { currentUser } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [uid, setUid] = useState(currentUser.uid);
  const [mealId, setMealId] = useState(null);

  useEffect(() => {
    console.log('The user id is =>' + uid);

    const db = firebase.firestore();
    let list = [];

    db.collection('meals')
      .where('usid', '==', uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const fetchedMealData = {
            id: doc.id,
            ...doc.data()
          };
          list.push(fetchedMealData);
          console.log(list);

          // meals.push(fetchedMealData);
        });
        setMeals(list);
      });
  }, []);

  //   const getMealId = clickedMealId => {
  //     console.log(clickedMealId);
  // setMeals(clickedMealId)

  //     const db = firebase.firestore();

  //     db.collection('users')
  //       .add({
  //         savedRecipes:[]
  //       })
  //       .then(docRef => {
  //         this.props.history.push('/saved');
  //       });
  //   };

  const learnMore = clickedMealId => {
    console.log(clickedMealId);
    this.props.history.push('/meal', { id: clickedMealId });
  };
  console.log(meals);
  return (
    <div>
      <ChefBar />
      <h2
        style={{
          marginTop: 80,
          textAlign: 'left',
          marginLeft: 60,
          marginBottom: 8,
          fontFamily: 'arial'
        }}
      >
        My recipes
      </h2>

      {meals.map(meal => (
        <Card borderRadius='50%' {...defaultProps} className='card'>
          <CardActionArea className='area'>
            <CardMedia className='CardImage' image={meal.image} />
            <h1 className='Cardtitle'>{meal.mealName}</h1>
            {/* <Grid className='starsCard'>
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
              </Grid> */}
            <Typography>
              <CardActions className='Cardactions'>
                <IconButton className='expandOpen1'>
                  <img alt='saveicone' className='saveCard' src={savedEmpty} />
                </IconButton>
                {/* <IconButton className='expandOpen2'>
                    <img
                      alt='unscheduleicone'
                      className='unscheduleCard'
                      src={unschedule}
                    />
                  </IconButton> */}
              </CardActions>
            </Typography>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
