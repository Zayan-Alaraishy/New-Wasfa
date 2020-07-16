import React, { Component } from 'react';
import './meal.css';
import { Grid } from '@material-ui/core';
import LearnerBar from './Logged/learnerBar';
import ChefBar from './Cheif/chefBar';
import stary from './images/stary.png';
import { firebase } from '../firebase';

class Meal extends Component {
  state = {
    meal: {},
    chef: null,

    vegetarian: null,
    chefId: '',
    chefName: '',
    chef: null,
    userType: '',
    space: '  '
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const db = firebase.firestore();
    console.log(this.props);
    console.log('mealId', IDBCursor);
    const { meal } = this.state;
    let x = '';
    let me = this;
    db.collection('meals')
      .doc(id)
      .get()
      .then(doc => {
        console.log(doc.data());
        const chefId = doc.data().usid;
        x = chefId;
        console.log(chefId, 'id');
        this.setState({ chefId: chefId });
        this.setState({ meal: doc.data() });
        const vegetarian = doc.data().veg;

        if (vegetarian == 'Veg') {
          this.setState({ vegetarian: true });
        } else {
          this.setState({ vegetarian: false });
        }
      })
      .then(doc => {
        db.collection('users')
          .doc(x)
          .get()
          .then(doc => {
            console.log(doc.data(), 'hhhhh');
            this.setState({ chefName: doc.data().Username });
          });
      })
      .then(() => {});

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
    const { meal: item, chefName, chef } = this.state;
    console.log(this.state.meal);
    console.log(chef);
    return (
      <div className='MealContanier'>
        <div>{bar}</div>
        <h1 className='nevermind'>blbla</h1>
        <img className='MealShape1' src={item.image} />
        <img className='MealShape2' src={item.image} />
        <Grid className='chefby'>
          <h className='MealName'>{item.mealName}</h>

          <h className='by'>by: {chefName}</h>
        </Grid>
        <Grid className='starts'>
          <img className='stary' src={stary} />
          <img className='stary' src={stary} />
          <img className='stary' src={stary} />
          <img className='stary' src={stary} />
          <img className='stary' src={stary} />
        </Grid>
        <h className='IngredientsH'>Ingredients:</h>
        <p className='Ingredients'>{item.Ingredients}</p>
        <h className='RecipeH'>Recipe:</h>
        <p className='Recipe'>{item.recipe}</p>

        <h className='time'>
          Eating time: <p className='timep'> {item.TimeToEat}</p>
        </h>

        <h className='Area'>
          Area: <p className='Areap'>{item.region}</p>
        </h>
        <h className='type'>
          Type:{' '}
          <p className='typep' p>
            {item.MealType}
          </p>
        </h>

        <h className='veg'>
          Meat meal: <p className='vegp'>{item.veg}</p>
        </h>
      </div>
    );
  }
}

export default Meal;
