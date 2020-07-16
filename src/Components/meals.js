import React, { Component } from 'react';
import './meal.css';
import { AppBar, Toolbar, Grid, Button, Link } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import stary from './images/stary.png';
import { firebase } from '../firebase';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#3A3A3A',
      dark: '#ffffff',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff'
    }
  }
});
class Meal extends Component {
  state = {
    meal: {},
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

    const { state } = this.props.history.location;
    console.log('mealId', state.id);
    const { meal } = this.state;
    let me = this;
    db.collection('meals')
      .doc(id)
      .get()
      .then(doc => {
        console.log(doc.data());
        const chefId = doc.data().usid;
        console.log(chefId);
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
          .doc(this.state.chefId)
          .get()
          .then(doc => {
            console.log(doc.data());
            this.setState({ chefName: doc.data().Username });
          });
      })
      .then(() => {
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

          const { userType } = this.state;
          db.collection('users')
            .doc(this.state.uid)
            .get()
            .then(doc => {
              console.log(doc.data());
              const fetchedType = doc.data().userType;
              console.log(fetchedType);
              if (fetchedType == 'cheif') {
                this.setState({ chef: true });
              } else {
                //
              }
            });
        });
      });
  }
  render() {
    const { meal: item, chefName, chef, space } = this.state;
    console.log(this.state.meal);
    console.log(chef);
    return (
      <div className='MealContanier'>
        <ThemeProvider theme={theme}>
          <AppBar color='primary'>
            <Toolbar>
              <Grid> </Grid>
              <Grid item sm={11} xs={9} />
              <Button className='ExploreSignUpButton' color='secondary'>
                SignUp
              </Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
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
        <p className='Ingredients'>{item.mealContents}</p>

        <h className='RecipeH'>Recipe:</h>

        <p className='Recipe'>{item.recipe}</p>
        <h className='type'>
          Type:{' '}
          <p className='typep' p>
            san
          </p>
        </h>

        <h className='time'>
          Eating time: <p className='timep'> {item.TimeToEat}</p>
        </h>

        <h className='Occasions'>
          Occasions: <p className='Occasionsp'>{item.occasions}</p>
        </h>

        <h className='Area'>
          Area: <p className='Areap'>{item.region}</p>
        </h>
        <h className='Time'>
          Time: <p className='Timep'>{item.timeNeed}</p>
        </h>
      </div>
    );
  }
}

export default Meal;
