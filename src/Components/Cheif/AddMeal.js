import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import logo from '../images/logo.png';

import { AppBar, Toolbar, Grid, Button, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import './AddMeal.css';
import { db, firebase } from '../../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));
const defaultProps = {
  style: {
    width: '530px',
    height: '500px',
    borderRadius: '5px',
    center: '100%',
    marginTop: '51px',
    marginLeft: '95px',
    marginRight: '50px',
    marginBottom: '52px'
  }
};
const defaultProps2 = {
  style: {
    width: '530px',
    height: '500px',
    borderRadius: '5px',
    marginTop: '51px',
    marginLeft: '50px',
    marginRight: '95px',
    marginBottom: '52px'
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3a3a3a',
      dark: '#757ce8',
      contrastText: '#757ce8'
    },
    secondary: {
      light: '#ff7961',
      main: '#fff',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

class AddMeal extends Component {
  state = {
    uid: '',
    image: null,
    url: '',
    occasions: [],
    eatTime: []
  };
  componentDidMount() {
    const db = firebase.firestore();

    db.collection('meals')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data().first}`);
        });
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        this.setState({ uid: user.uid });
      } else {
        // User not logged in or has just logged out.
      }
    });
  }

  handleChange = e => {
    let key = e.target.name;

    this.setState({
      [key]: e.target.value
    });
  };

  handleImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleChangeCheckbox = e => {
    console.log(e.target.checked);
    let checked = e.target.checked;
    const { occasions } = this.state;
    if (checked == true) {
      if (occasions.includes(e.target.name)) {
      } else {
        occasions.push(e.target.name);
        this.setState(occasions);
      }
    } else {
      if (occasions.includes(e.target.name)) {
        const filter = occasions.filter(item => item !== e.target.name);
        this.setState({ occasions: filter });
      } else {
      }
    }

    console.log(occasions);
  };

  handleChangeCheckboxTime = e => {
    console.log(e.target.checked);
    let checked = e.target.checked;
    const { eatTime } = this.state;
    if (checked == true) {
      if (eatTime.includes(e.target.name)) {
      } else {
        eatTime.push(e.target.name);
        this.setState(eatTime);
      }
    } else {
      const filter = eatTime.filter(item => item !== e.target.name);
      this.setState({ eatTime: filter });
    }

    console.log(eatTime);
  };

  handleUpload = () => {
    const storage = firebase.storage();
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  AddMeal = () => {
    const db = firebase.firestore();

    const {
      name,
      contents,
      recipe,

      url,
      uid
    } = this.state;

    console.log(this.state);
    db.collection('meals').add({
      mealName: name,
      mealContents: contents,
      recipe: recipe,
      image: url,
      usid: uid
    });
  };

  render() {
    return (
      <Grid className='AddMealContaner'>
        <ThemeProvider theme={theme}>
          <AppBar position='static' color='primary'>
            <Toolbar>
              <Grid>
                <img src={logo} className='Logo' />
              </Grid>
              <Grid item sm={11} xs={6} />
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <Card {...defaultProps} className='cardAddMeal'>
          <form noValidate autoComplete='off'>
            <TextField
              id='standard-basic'
              label='Meal Name'
              name='name'
              onChange={this.handleChange}
              required
            />
          </form>
          <form noValidate autoComplete='off'>
            <TextField
              id='standard-basic'
              label='Ingredients '
              name='contents'
              onChange={this.handleChange}
              required
            />
          </form>
          <form noValidate autoComplete='off'>
            <TextField
              id='standard-basic'
              label='Recipe'
              onChange={this.handleChange}
              required
              name='recipe'
            />
          </form>
          <form noValidate autoComplete='off'>
            <input
              type='file'
              onChange={this.handleImageChange}
              className='inputAdd-image'
            />
          </form>

          <Grid>
            <button className='upload' onClick={this.handleUpload}>
              Upload
            </button>
          </Grid>
        </Card>

        <Card {...defaultProps2} className='cardAddMeal'>
          <Grid className='AddGrid1'>
            <text>Is it: </text>
            <Radio
              color='default'
              name='veg'
              onChange={this.handleChange}
              value='Veg'
              required
            />
            <text>meat meal</text>
            <Radio
              color='default'
              name='veg'
              onChange={this.handleChange}
              value='non-veg'
              required
            />
            <text>lean meal</text>
          </Grid>
          <Grid className='AddGrid2'>
            <text>Is it:</text>
            <Radio
              color='default'
              name='region'
              onChange={this.handleChange}
              value='westren'
              required
            />
            <text>western</text>
            <Radio
              color='default'
              name='region'
              onChange={this.handleChange}
              value='eastren'
              required
            />
            <text>eastern</text>
            <Radio
              color='default'
              name='region'
              onChange={this.handleChange}
              value='asian'
              required
            />
            <text>asian</text>
          </Grid>
          <Grid className='AddGrid3'>
            <text>Is it:</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              name='breakfast'
              checked={this.state.checked}
              onChange={this.handleChangeCheckboxTime}
              required
            />
            <text>Breakfast</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              name='lunch'
              checked={this.state.checked}
              onChange={this.handleChangeCheckboxTime}
              required
            />
            <text>Lunch</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              name='dinner'
              checked={this.state.checked}
              onChange={this.handleChangeCheckboxTime}
              required
            />
            <text>Dinner</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              name='snak'
              checked={this.state.checked}
              onChange={this.handleChangeCheckboxTime}
              required
            />
            <text>Snacks</text>
          </Grid>
          <text className='MealTypeText1'>Meal Type:</text>
          <text className='choose1'>(choose only one)</text>
          <text className='MealTypeText2'>Occasions:</text>
          <div class='vl'></div>
          <Grid className='gridMealType1'>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              value='Salads'
              checked={this.state.salad}
              onChange={this.handleChange}
              required
            />
            <text>salad</text>

            <Radio
              color='default'
              name='radio-button-demo'
              size='small'
              name='clasifiction'
              type='radio'
              value='Main meals'
              checked={this.state.mainMeal}
              onChange={this.handleChange}
              required
            />
            <text>main meals</text>
          </Grid>{' '}
          <Grid className='gridMealType2'>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              value='Drinks'
              checked={this.state.drink}
              onChange={this.handleChange}
              required
            />
            <text>Drinks</text>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              value='Deserts'
              type='radio'
              checked={this.state.desert}
              onChange={this.handleChange}
              required
            />
            <text>Deserts</text>
          </Grid>{' '}
          <Grid className='gridMealType3'>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              checked={this.state.soap}
              onChange={this.handleChange}
              value='Soup'
              required
            />
            <text>Soup</text>

            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              checked={this.state.sandwich}
              onChange={this.handleChange}
              value='Sandwiches'
            />
            <text>Sandwiches</text>
          </Grid>{' '}
          <Grid className='gridMealType4'>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              value='Starters'
              checked={this.state.starter}
              onChange={this.handleChange}
              required
            />
            <text>Street</text>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              checked={this.state.pastry}
              onChange={this.handleChange}
              value='Pastries'
            />
            <text>Pastries</text>
          </Grid>{' '}
          <Grid className='gridMealType5'>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              value='sauce'
              checked={this.state.sauce}
              onChange={this.handleChange}
            />
            <text>sauce</text>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              checked={this.state.seaFood}
              onChange={this.handleChange}
              value='Sea food'
            />
            <text>Sea food</text>
          </Grid>
          {/* .............................. */}
          <Grid className='Occasions'>
            <Grid className='Occasions1'>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Birthday'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Birthday</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Picnic'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Picnic</text>
            </Grid>
            <Grid className='Occasions2'>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='ThanksGiving'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Thanksgiving</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Eid'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Eid</text>
            </Grid>
            <Grid className='Occasions3'>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Ramadan'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Ramadan</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='foodParty'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>party food</text>
            </Grid>
            <Grid className='Occasions4'>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Entertaining'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Entertaining</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Camping'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Camping</text>
            </Grid>
            <Grid className='Occasions5'>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Chritmas'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>Christmas</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='None'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text>None</text>
            </Grid>
          </Grid>
          <Button className='AddButton' onClick={this.AddMeal}>
            Add meal
          </Button>
        </Card>
      </Grid>
    );
  }
}

export default AddMeal;
