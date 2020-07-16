import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { Typography, Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import LearnerBar from '../Logged/learnerBar';
import ChefBar from '../Cheif/chefBar';
import savedEmpty from '../images/savedEmpty.png';
import star from '../images/star.png';
import { db, firebase } from '../../firebase';

const defaultProps = {
  style: {
    width: '260px',
    height: '290px',
    borderRadius: '20px',
    marginLeft: '55px'
  }
};
class Save extends Component {
  state = {
    favMeals: [],
    uid: '',
    currentUserMealId: []
  };

  componentDidMount() {
    const db = firebase.firestore();
    let me = this;
    const { currentUserMealId, favMeals } = this.state;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        this.setState({ uid: user.uid });
        console.log(this.state.uid);
      } else {
        console.log('not logged in ');

        // User not logged in or has just logged out.
      }

      db.collection('mealUserId')
        .where('currentUserUid', '==', this.state.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            currentUserMealId.push(doc.data().mealId);
            me.setState(currentUserMealId);
          });
        })
        .then(() => {
          console.log(currentUserMealId);
          currentUserMealId.forEach(id => {
            console.log(id);
            db.collection('meals')
              .doc(id)
              .get()
              .then(doc => {
                console.log(doc.data());
                const fetchedMealData = {
                  id: doc.id,
                  ...doc.data()
                };
                favMeals.push(fetchedMealData);
                me.setState(favMeals);
                console.log(favMeals);
              });
          });
        });
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            console.log(doc.data());
            const fetchedType = doc.data().userType;
            console.log(fetchedType);
            if (fetchedType == 'chef') {
              this.setState({ chef: true });
            } else {
            }
          });
      } else {
        // User not logged in or has just logged out.
      }
    });
  }

  learnMore = clickedMealId => {
    this.props.history.push('/meal', { id: clickedMealId });
  };
  render() {
    let bar;
    if (this.state.chef) {
      bar = (
        <div>
          <ChefBar {...this.props} />
        </div>
      );
    } else {
      bar = (
        <div>
          <LearnerBar {...this.props} />
        </div>
      );
    }
    const { favMeals } = this.state;
    console.log(this.state.favMeals);
    return (
      <div>
        <h1>gh</h1>
        <div>{bar}</div>

        {favMeals.map(meal => (
          <Card borderRadius='50%' {...defaultProps} className='card'>
            <CardActionArea className='area'>
              <CardMedia
                className='CardImage'
                image={meal.image}
                onClick={() => this.learnMore(meal.id)}
              />
              <h1 className='Cardtitle'>{meal.mealName}</h1>

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

export default Save;
