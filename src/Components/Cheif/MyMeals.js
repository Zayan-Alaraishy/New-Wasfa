import React, { Component } from 'react';
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

const defaultProps = {
  style: {
    width: '260px',
    height: '290px',
    borderRadius: '20px',
    marginLeft: '55px'
  }
};
class MyMeals extends Component {
  state = {
    meals: [],
    uid: ''
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        this.setState({ uid: user.uid });
        console.log(this.state.uid);
      } else {
        // User not logged in or has just logged out.
      }
      console.log('The user id is =>' + this.state.uid);

      const db = firebase.firestore();
      let me = this;
      console.log('The user id is =>' + this.state.uid);

      db.collection('meals')
        .where('usid', '==', this.state.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // this.state.meals.push(doc.data());
            // me.setState(this.state.meals)
            const fetchedMealData = {
              id: doc.id,
              ...doc.data()
            };
            console.log(fetchedMealData);
            this.state.meals.push(fetchedMealData);
            me.setState(this.state.meals);
          });
        });
    });
  }

  getMealId = clickedMealId => {
    console.log(clickedMealId);
    this.setState({ mealId: clickedMealId });
    console.log(this.state.mealId);

    const db = firebase.firestore();

    const { uid } = this.state;
    console.log(this.state);

    db.collection('mealUserId')
      .add({
        mealId: clickedMealId,
        currentUserUid: uid
      })
      .then(docRef => {
        this.props.history.push('/favourite');
      });
  };

  learnMore = clickedMealId => {
    console.log(clickedMealId);
    this.props.history.push('/meal', { id: clickedMealId });
  };
  render() {
    const { meals } = this.state;
    console.log(this.state.meals);

    return (
      <div>
        <h1>working</h1>
        {meals.map(meal => (
          <Card borderRadius='50%' {...defaultProps} className='card'>
            <CardActionArea className='area'>
              <CardMedia className='CardImage' image={meal.image} />
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
                  <IconButton className='expandOpen1'>
                    <img
                      alt='saveicone'
                      className='saveCard'
                      src={savedEmpty}
                    />
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
        ))}
      </div>
    );
  }
}

export default MyMeals;
