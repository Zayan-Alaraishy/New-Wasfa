import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from '../../Auth';
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
import { useHistory } from 'react-router-dom';

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

export default function SignInSide() {
  const history = useHistory();
  function handleClick() {
    history.push('/signup');
  }
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

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedType, setloggedType] = useState('');
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to='/homelogged' />;
  }

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
              if (doc.data().userType == 'admin') {
                history.push('/AdminHome');
              } else {
                history.push('/homelogged');
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
      <Grid className='SignUpContaner'>
        <img src={Pan} className='pan' />

        <Card {...defaultProps} className='cardAddMeal'>
          {/* <Avatar className='Avatar'>
            <LockOutlinedIcon />
          </Avatar> */}
          <p className='signup'>Sign in</p>
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
          <Grid>
            <Link href='#' className='Forgetpassword'>
              Forget password?
            </Link>
          </Grid>
          <Grid>
            <Button
              className={clsx(classes.margin, classes.buttonField)}
              type='submit'
              variant='contained'
              color='primary'
              onClick={signin}
              style={{ marginTop: '30px' }}
            >
              Sign in
            </Button>
          </Grid>

          <Grid>
            <Grid item>
              <Link onClick={handleClick} className='Do'>
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
