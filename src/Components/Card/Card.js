import React, { Component } from 'react';
import './Card.css';
import { db, firebase } from '../../firebase';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Grid } from '@material-ui/core';

import savedEmpty from '../images/savedEmpty.png';
import star from '../images/star.png';
import pizza from '../images/pizza.jpeg';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import unschedule from '../images/unschedule.png';

import { useHistory } from 'react-router-dom';

const defaultProps = {
  style: {
    width: '260px',
    height: '290px',
    borderRadius: '20px',
    marginLeft: '55px'
  }
};

class MediaCard extends Component {
  state = {
    meals: [],
    uid: '',
    mealId: '',
    favMeals: []
  };

  componentDidMount() {
    const db = firebase.firestore();
    const { meals, favMeals, uid, mealId } = this.state;
    let me = this;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        this.setState({ uid: user.uid });
      } else {
        // User not logged in or has just logged out.
      }
    });

    db.collection('meals')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          const fetchedMealData = {
            id: doc.id,
            ...doc.data()
          };
          meals.push(fetchedMealData);
          me.setState(meals);
        });
      });
  }

  getMealId = clickedMealId => {
    const { favMeals, uid } = this.state;
    console.log(clickedMealId);
    this.setState({ mealId: clickedMealId });
    console.log(this.state.mealId);
    const db = firebase.firestore();
    console.log(this.state.uid);

    db.collection('mealUserId')
      .where('currentUserUid', '==', this.state.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, '=>', doc.data());
          const favMealsList = [];
          const fetchedFavMealsId = doc.data().mealId;
          favMealsList.push(fetchedFavMealsId);
          console.log(favMealsList);
          favMeals.push(fetchedFavMealsId);
          this.setState(favMeals);
          console.log(this.state.favMeals);
        });
      })
      .then(() => {
        if (this.state.favMeals.includes(clickedMealId)) {
          alert('This meal is already saved');
        } else {
          db.collection('mealUserId').add({
            mealId: clickedMealId,
            currentUserUid: uid
          });
          alert('This meal is saved');
        }
      });
  };

  learnMore = clickedMealId => {
    console.log(clickedMealId);
    this.props.history.push(`/meal/${clickedMealId}`);
  };

  render() {
    const { meals } = this.state;
    console.log(this.state.meals);

    return (
      <div>
        {meals.map(meal => (
          <Card borderRadius='50%' {...defaultProps} className='card'>
            <CardActionArea className='area'>
              <CardMedia
                className='CardImage'
                image={meal.image}
                onClick={() => this.learnMore(meal.id)}
              />
              <h1 className='Cardtitle'>{meal.mealName}</h1>
              <Grid className='starsCard'>
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
                <img alt='star' className='Cardstar' src={star} />
              </Grid>
              <Typography>
                <CardActions className='Cardactions'>
                  <IconButton className='expandOpen2'>
                    <img
                      alt='saveicone'
                      className='unscheduleCard'
                      src={savedEmpty}
                      onClick={() => this.getMealId(meal.id)}
                    />
                  </IconButton>
                </CardActions>
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </div>
    );
  }
}

export default MediaCard;
