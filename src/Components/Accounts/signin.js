import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import image from '../images/pan2.png';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { db, firebase } from '../../firebase';
import history from '../../History';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(https://images.unsplash.com/photo-1592888039868-72821bb2db31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)`,
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ffa500'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#59595c',
      dark: '#bbb',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedType, setloggedType] = useState('');

  const signin = () => {
    setloggedType('chef');
    console.log(loggedType);
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user.uid);

        const db = firebase.firestore();
        db.collection('users')
          .where('Email', '==', email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, ' => ', doc.data());
              console.log(doc.data().userType);
              setloggedType(doc.data().userType);
              if (doc.data().userType == 'chef') {
                // this.props.history.push('/chef');
                console.log('to chef');
              } else {
                // this.props.history.push('/learner');
                console.log('to learner');
              }
            });
          })
          .catch(function(error) {
            console.log('Error getting documents: ', error);
          });
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        alert(errorCode);
        // ...
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in to Wasfa
            </Typography>
            {/* <h1>{loggedType}</h1> */}
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={event => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={event => {
                  setPassword(event.target.value);
                }}
              />
              <Grid container>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={signin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={() => history.push('/signup')} variant='body2'>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
