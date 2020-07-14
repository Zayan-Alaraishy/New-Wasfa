import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Button,
  TextField,
  FormControl,
  Link,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
  Card,
  Radio,
  makeStyles,
  createMuiTheme
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Pan from '../images/pan2.png';
import { firebase } from '../../firebase';
import './signup.css';
const defaultProps = {
  style: {
    width: '530px',
    height: '580px',
    borderRadius: '5px',
    marginTop: '55px',
    marginLeft: '805px'
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: '10px'
  },

  textField: {
    width: '25ch'
  },
  buttonField: {
    width: '30ch'
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
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });

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
      <Grid className='SignUpContaner'>
        <img src={Pan} className='pan' />
        <Card {...defaultProps} className='cardAddMeal'>
          <p className='signup'>Sign up</p>
          <form noValidate autoComplete='off'>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              margin='normal'
              required
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
          </form>
          <form>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              margin='normal'
              required
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
          </form>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor='standard-adornment-password'>
              Password
            </InputLabel>

            <Input
              margin='normal'
              required
              name='password'
              label='Password'
              type='password'
              id='password'
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid className={clsx(classes.margin)}>
            <text>Sign up as:</text>

            <Radio
              color='default'
              size='small'
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
            <text> Learner</text>

            <Radio
              color='default'
              size='small'
              type='radio'
              name='type'
              defaultValue='option1'
              value='chef'
              onChange={event => {
                setType(event.target.value);
              }}
              required
            />
            <text>Chef</text>
          </Grid>

          <Button
            className={clsx(classes.margin, classes.buttonField)}
            type='submit'
            variant='contained'
            color='primary'
            onClick={addUser}
          >
            Sign up
          </Button>
          <Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                Have you already an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
