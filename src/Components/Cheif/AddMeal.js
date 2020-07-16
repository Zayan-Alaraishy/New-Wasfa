import React, { Component } from 'react';

import Card from '@material-ui/core/Card';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { AppBar, Toolbar, Grid, Button, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import './AddMeal.css';
import { firebase } from '../../firebase';
import { classes } from 'istanbul-lib-coverage';

import logo from '../images/logo2.png';
import chef from '../images/chef.png';
import add from '../images/add.png';
import chefblack from '../images/chefblack.png';
import savedFull from '../images/savedFull.png';
import recipe from '../images/recipe (1).png';
import calendar from '../images/calendar.png';
import logout from '../images/logout.png';
import arrow from '../images/arrow.png';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
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
      light: '#3a3a3a',
      main: '#3a3a3a',
      dark: '#3a3a3a',
      contrastText: '#3a3a3a'
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
    console.log('working');
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
      time,
      veg,
      url,
      uid,
      occasions,
      eatTime,
      servers,
      region,
      clasifiction
    } = this.state;

    console.log(this.state);
    db.collection('meals').add({
      mealName: name,
      Ingredients: contents,
      recipe: recipe,
      image: url,
      usid: uid,
      TimeToEat: eatTime,
      Occasions: occasions,
      region: region,
      MealType: clasifiction
    });
  };

  render() {
    // const handleMenu = event => {
    //   setAnchorEl(event.currentTarget);
    // };
    // const handleMenu2 = event => {
    //   setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //   setAnchorEl(null);
    // };
    // const handleClose2 = () => {
    //   setAnchorEl(null);
    // };
    // function handleClick() {
    //   history.push('/addmeal');
    // }
    return (
      <Grid className='AddMealContaner'>
        <ThemeProvider theme={theme}>
          <AppBar color='primary'>
            <Toolbar>
              <Grid>
                <img src={logo} className='Logo' />
              </Grid>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <Grid xs={9} sm={8} />
              <img src={arrow} className='Categories' />
              <Link className='LinkCategories'>Categories</Link>

              <Menu
                className={classes.menue}
                id='menu-appbar'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Grid>
                  <text className='type'>Type:</text>
                  <text className='line1'>_________</text>

                  <MenuItem className={classes.menue}>salad</MenuItem>
                  <MenuItem className={classes.menue}>burgers</MenuItem>
                  <MenuItem className={classes.menue}>Pastries</MenuItem>
                  <MenuItem className={classes.menue}>Sandwiches </MenuItem>
                  <MenuItem className={classes.menue}>Drinks</MenuItem>
                  <MenuItem className={classes.menue}>Soup</MenuItem>
                  <MenuItem className={classes.menue}>Sea food</MenuItem>
                  <MenuItem className={classes.menue}>Deserts </MenuItem>
                </Grid>

                <Grid className='menubar2'>
                  <text className='type'>Eating time:</text>
                  <text className='line2'>_______________</text>
                  <MenuItem className={classes.menue}>breakfast</MenuItem>
                  <MenuItem className={classes.menue}>dinner</MenuItem>
                  <MenuItem className={classes.menue}>lunch</MenuItem>
                  <MenuItem className={classes.menue}>snaks</MenuItem>{' '}
                  <text className='type'>Time needed:</text>
                  <text className='line3'>_________________</text>
                  <MenuItem className={classes.menue}>15 min</MenuItem>
                  <MenuItem className={classes.menue}>30 min</MenuItem>
                  <MenuItem className={classes.menue}>An hour</MenuItem>
                </Grid>

                <Grid className='menubar3'>
                  <text className='type'>Occasions:</text>
                  <text className='line2'>_____________</text>
                  <MenuItem className={classes.menue}>Ramadan</MenuItem>
                  <MenuItem className={classes.menue}>Birthdays</MenuItem>
                  <MenuItem className={classes.menue}>Christmas</MenuItem>
                  <MenuItem className={classes.menue}>Picnic</MenuItem>{' '}
                  <MenuItem className={classes.menue}>Eid</MenuItem>{' '}
                </Grid>
                <Grid className='menubar4'>
                  <text className='type'>Area:</text>
                  <text className='line2'>_________</text>
                  <MenuItem className={classes.menue}>Western</MenuItem>
                  <MenuItem className={classes.menue}>Eastern</MenuItem>
                  <MenuItem className={classes.menue}>Asian </MenuItem>
                  <text className='type'>Vegan :</text>
                  <text className='line4'>_________</text>
                  <MenuItem className={classes.menue}>for Vegans</MenuItem>
                </Grid>
              </Menu>

              <img src={add} className='add' />

              <Link className='LinkCategories'>AddMeal</Link>

              <Grid>
                <img src={chef} className='chef' />
                <Menu
                  id='menu-appbar'
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem>
                    <img src={chefblack} className='chefblack' />
                    User name
                  </MenuItem>
                  <MenuItem>
                    <img src={savedFull} className='chefblack' />
                    saved recipes
                  </MenuItem>
                  <MenuItem>
                    <img src={recipe} className='chefblack' />
                    My recipes
                  </MenuItem>
                  <MenuItem>
                    <img src={calendar} className='chefblack' />
                    Cooking Schedule
                  </MenuItem>
                  <MenuItem>
                    <img src={logout} className='chefblack' />
                    Log out
                  </MenuItem>
                </Menu>
              </Grid>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <h1>hk</h1>

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
            <Button
              variant='contained'
              className='upload'
              onClick={this.handleUpload}
            >
              Upload
            </Button>
            <Grid>
              {' '}
              <CircularProgress variant='static' value={this.state.progress} />
            </Grid>

            <img src={this.state.url} height='200' width='auto' />
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
              checked={this.state.veg === 'Veg'}
              required
            />
            <text>meat meal</text>
            <Radio
              color='default'
              name='veg'
              onChange={this.handleChange}
              value='non-veg'
              checked={this.state.veg === 'non-veg'}
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
              checked={this.state.region === 'westren'}
              required
            />
            <text>western</text>
            <Radio
              color='default'
              name='region'
              onChange={this.handleChange}
              value='eastren'
              checked={this.state.region === 'eastren'}
              required
            />
            <text>eastern</text>
            <Radio
              color='default'
              name='region'
              onChange={this.handleChange}
              value='asian'
              checked={this.state.region === 'asian'}
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
            {' '}
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              value='Salads'
              checked={this.state.salad}
              onChange={this.handleChange}
              checked={this.state.clasifiction === 'Salads'}
              required
            />
            <text>salad</text>
            <Radio
              className={classes.main}
              color='default'
              name='radio-button-demo'
              size='small'
              name='clasifiction'
              type='radio'
              value='Main meals'
              checked={this.state.mainMeal}
              onChange={this.handleChange}
              checked={this.state.clasifiction === 'Main meals'}
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
              checked={this.state.clasifiction === 'Drinks'}
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
              checked={this.state.clasifiction === 'Deserts'}
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
              checked={this.state.clasifiction === 'Soup'}
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
              checked={this.state.clasifiction === 'Sandwiches'}
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
              checked={this.state.clasifiction === 'Starters'}
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
              checked={this.state.clasifiction === 'Pastries'}
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
              checked={this.state.clasifiction === 'sauce'}
            />
            <text>sauce</text>
            <Radio
              color='default'
              size='small'
              name='clasifiction'
              type='radio'
              checked={this.state.seaFood}
              onChange={this.handleChange}
              checked={this.state.clasifiction === 'Sea food'}
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
              <text className='OccasionsText'>Birthday</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Picnic'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text className='OccasionsText'>Picnic</text>
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
              <text className='OccasionsText'>Thanksgiving</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Eid'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text className='OccasionsText'>Eid</text>
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
              <text className='OccasionsText'>Ramadan</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='foodParty'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text className='OccasionsText'>party food</text>
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
              <text className='OccasionsText'>Entertaining</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='Camping'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text className='OccasionsText'>Camping</text>
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
              <text className='OccasionsText'>Christmas</text>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                name='None'
                size='small'
                checked={this.state.checked}
                onChange={this.handleChangeCheckboxTime}
                required
              />
              <text className='OccasionsText'>None</text>
            </Grid>
          </Grid>
          <Button
            variant='contained'
            className='AddButton'
            onClick={this.AddMeal}
          >
            Add meal
          </Button>
        </Card>
      </Grid>
    );
  }
}

export default AddMeal;
