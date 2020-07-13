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
  },
  text1: {
    paddingTop: 12,
    paddingRight: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59595c'
  },
  text2: {
    paddingTop: 12,
    fontSize: 18,
    color: '#59595c',
    paddingRight: 20
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#bbb',
      main: '#59595c',
      dark: '#59595c',
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

export default function SignUpSide() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [type, setType] = useState('');

  const addUser = e => {
    e.preventDefault();

    console.log(email, password, type, 'email,password');
    const db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser;
        db.collection('users')
          .doc(user.uid)
          .set({
            Email: email,
            Username: username,
            userType: type
          })
          .then(docRef => {
            if (type == 'chef') {
              // this.props.history.push('/chef');
              console.log('to chef');
            } else {
              // this.props.history.push('/learner');
              console.log('to learner');
            }
          })
          .catch(function(error) {
            console.error('Error adding document: ', error);
          });
      })

      .catch(function(error) {
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
              Sign up to Wasfa
            </Typography>
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
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
                value={username}
                onChange={event => {
                  setUsername(event.target.value);
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
                <text className={classes.text1}>Sign up as:</text>

                <text className={classes.text2}>
                  <input
                    type='radio'
                    name='type'
                    defaultValue='option1'
                    value='user'
                    value={username}
                    onChange={event => {
                      setType(event.target.value);
                    }}
                    required
                  />
                  Learner
                </text>

                <text className={classes.text2}>
                  <input
                    type='radio'
                    name='type'
                    defaultValue='option1'
                    value='chef'
                    onChange={event => {
                      setType(event.target.value);
                      return (
                        <div>
                          <h1> hello chef</h1>
                        </div>
                      );
                    }}
                    required
                  />
                  Chef
                </text>
              </Grid>

              {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={addUser}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='#' variant='body2'>
                    Have you already an account? Sign in
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
