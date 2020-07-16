import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { db, firebase } from '../../firebase';

import { AppBar, Toolbar, Grid } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { AuthContext } from '../../Auth';

import logo from '../images/logo2.png';
import chef from '../images/chef.png';
import add from '../images/add.png';
import chefblack from '../images/chefblack.png';
import savedFull from '../images/savedFull.png';
import recipe from '../images/recipe (1).png';
import calendar from '../images/calendar.png';
import logout from '../images/logout.png';
import arrow from '../images/arrow.png';
import './chefBar.css';
import { useHistory } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#3a3a3a',
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

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'secondary'
  },
  inputRoot: {
    color: 'secondary'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: 'secondary',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  menue: {
    width: '550px',
    hight: '1000px',
    color: 'primary'
  }
}));

const ChefBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [categoryOpen, setCatrgoryOpen] = useState(false);
  // const [profileOpen, setCatrgoryOpen] = useState(false);

  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  const open = Boolean(anchorEl);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        console.log(doc.data().Username);
        setName(doc.data().Username);
      });
  });

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2 = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log('working');
  }; // history.push('/mymeals');

  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const handleClick = () => {
    history.push('/addmeal');
  };
  const handleLogOut = () => {
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
  const push_myRecipes = () => {
    history.push('/MyMeals');
  };
  const push_saved = () => {
    history.push('/save');
  };
  const handleSearch = e => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      history.push(`/result/${e.target.value}`);
    }
  };
  const handleCloseLogOut = () => {
    setAnchorEl(null);
    firebase
      .auth()
      .signOut()
      .then(function() {
        history.push('/signin');
      })
      .catch(function(error) {
        // An error happened.
      });
  };
  return (
    <Grid className='ExploreContaner'>
      <ThemeProvider theme={theme}>
        <AppBar color='primary'>
          <Toolbar>
            <Grid>
              <img
                src={logo}
                className='Logo'
                onClick={() => history.push('/homelogged')}
              />
            </Grid>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search by ingredients..'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={event => {
                  setSearch(event.target.value);
                  console.log(event.target.value);
                  // this.props.history.push(`/result/${event.target.value}`);
                }}
                onKeyDown={handleSearch}
              />
            </div>
            <Grid xs={9} sm={8} />
            <img src={arrow} className='Categories' />
            <Link className='LinkCategories'>Categories</Link>

            {/* <Menu
              className={classes.menue}
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose2}
            >
              <Grid>
                <text className='type'>Type:</text>
                <text className='line1'>_________</text>

                <MenuItem className={classes.menue} onClick={handleClose2}>
                  salad
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  burgers
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Pastries
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Sandwiches
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Drinks
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Soup
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Sea food
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Deserts{' '}
                </MenuItem>
              </Grid>

              <Grid className='menubar2'>
                <text className='type'>Eating time:</text>
                <text className='line2'>_______________</text>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  breakfast
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  dinner
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  lunch
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  snaks
                </MenuItem>{' '}
                <text className='type'>Time needed:</text>
                <text className='line3'>_________________</text>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  15 min
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  30 min
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  An hour
                </MenuItem>
              </Grid>

              <Grid className='menubar3'>
                <text className='type'>Occasions:</text>
                <text className='line2'>_____________</text>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Ramadan
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Birthdays
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Christmas
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Picnic
                </MenuItem>{' '}
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Eid
                </MenuItem>{' '}
              </Grid>
              <Grid className='menubar4'>
                <text className='type'>Area:</text>
                <text className='line2'>_________</text>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Western
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Eastern
                </MenuItem>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  Asian{' '}
                </MenuItem>
                <text className='type'>Vegan :</text>
                <text className='line4'>_________</text>
                <MenuItem className={classes.menue} onClick={handleClose2}>
                  for Vegans
                </MenuItem>
              </Grid>
            </Menu> */}

            <img onClick={handleClick} src={add} className='add' />

            <Link onClick={handleClick} className='LinkCategories'>
              AddMeal
            </Link>

            <Grid>
              <img onClick={handleMenu} src={chef} className='chef' />
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <img src={chefblack} className='chefblack' />
                  Chef {name}
                </MenuItem>
                <MenuItem onClick={push_saved}>
                  <img src={savedFull} className='chefblack' />
                  saved recipes
                </MenuItem>
                <MenuItem onClick={push_myRecipes}>
                  <img src={recipe} className='chefblack' />
                  My recipes
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                  <img src={calendar} className='chefblack' />
                  Cooking Schedule
                </MenuItem> */}
                <MenuItem onClick={handleLogOut}>
                  <img src={logout} className='chefblack' />
                  Log out
                </MenuItem>
              </Menu>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Grid>
  );
};
export default ChefBar;
