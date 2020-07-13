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
    // const db = firebase.firestore();

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
            <img
              src={this.state.url || 'http://via.placeholder.com/300x200'}
              className='uplodeimgImg'
            ></img>
            <button className='upload' onClick={this.handleUpload}>
              Upload
            </button>
          </Grid>
        </Card>

        <Card {...defaultProps2} className='cardAddMeal'>
          <Grid className='AddGrid1'>
            <text>Is it: </text>
            <Radio
              value='meat'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'Meat' }}
            />
            <text>meat meal</text>
            <Radio
              value='lean'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'Lean' }}
            />
            <text>lean meal</text>
          </Grid>
          <Grid className='AddGrid2'>
            <text>Is it:</text>
            <Radio
              value='western'
              color='default'
              name='radio-button'
              inputProps={{ 'aria-label': 'Western' }}
            />
            <text>western</text>
            <Radio
              value='eastern'
              color='default'
              name='radio-button'
              inputProps={{ 'aria-label': 'Eastern' }}
            />
            <text>eastern</text>
            <Radio
              value='asian'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'Asian' }}
            />
            <text>asian</text>
          </Grid>
          <Grid className='AddGrid3'>
            <text>Is it:</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
            />
            <text>Breakfast</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
            />
            <text>Lunch</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
            />
            <text>Dinner</text>
            <Checkbox
              color='default'
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
            />
            <text>Snacks</text>
          </Grid>
          <text className='MealTypeText'>Meal Type:</text>
          <text className='MealTypeText'>Occasions:</text>
          <div class='vl'></div>
          <Grid className='gridMealType'>
            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>

            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>
          </Grid>{' '}
          <Grid className='gridMealType'>
            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>

            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>
          </Grid>{' '}
          <Grid className='gridMealType'>
            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>

            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>
          </Grid>{' '}
          <Grid className='gridMealType'>
            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>

            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>
          </Grid>{' '}
          <Grid className='gridMealType'>
            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>

            <Radio
              value='e'
              color='default'
              name='radio-button-demo'
              inputProps={{ 'aria-label': 'E' }}
              size='small'
            />
            <text>salad</text>
          </Grid>
          <button className='Add' onClick={this.AddMeal}>
            Add meal
          </button>
        </Card>
      </Grid>
    );
  }
}

export default AddMeal;
