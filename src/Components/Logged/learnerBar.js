import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

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
import user from '../images/user.png';
import userblack from '../images/userblack.png';
import savedFull from '../images/savedFull.png';
import calendar from '../images/calendar.png';
import logout from '../images/logout.png';
import arrow from '../images/arrow.png';
import { db, firebase } from '../../firebase';
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

const LearnerBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = useState('');

  const [catergoryOpen, setCategoryOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');

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
    setProfileOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenu2 = event => {
    setCategoryOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProfileOpen(false);
    setAnchorEl(null);
    console.log('working');
  };

  const handleClose2 = () => {
    setCategoryOpen(false);
    setAnchorEl(null);
    console.log('working');
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
  const push_saved = () => {
    history.push('/saved');
  };
  const handleSearch = e => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      history.push(`/result/${e.target.value}`);
    }
  };
  return (
    <Grid className='ExploreContaner'>
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
            <img src={arrow} className='Categories' onClick={handleMenu2} />

            <Link onClick={handleMenu2} className='LinkCategories'>
              Categories
            </Link>

            <img onClick={handleMenu} src={user} className='chef' />

            <Menu
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
              open={catergoryOpen}
              onClose={handleClose2}
            >
              {' '}
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
            </Menu>

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
              open={profileOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <img src={userblack} className='chefblack' />
                Hello {name}
              </MenuItem>
              <MenuItem onClick={push_saved} onClick={handleClose}>
                <img src={savedFull} className='chefblack' />
                saved recipes
              </MenuItem>

              <MenuItem onClick={handleLogOut}>
                <img src={logout} className='chefblack' />
                Log out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Grid>
  );
};
export default LearnerBar;
