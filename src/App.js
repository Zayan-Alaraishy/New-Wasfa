import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Explore from './Components/Home/Explore';
import history from './History';
import Tutorial from './Components/Tutorial/Tutorial';
import AddMeal from './Components/Cheif/AddMeal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInSide from './Components/Accounts/signin';
import SignUp from './Components/Accounts/signup';
import Meal from './Components/meals';
import Save from './Components/Logged/saved';

import HomeLogged from './Components/Logged/homeLogged';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';

import MyMeals from './Components/Cheif/MyMeals';
function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/explore' component={Explore}>
              <Explore />
            </Route>
            <PrivateRoute path='/addmeal' component={AddMeal} />
            <PrivateRoute path='/myMeals' component={MyMeals} />

            <Route path='/tutorial'>
              <Tutorial />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path='/signin'>
              <SignInSide />
            </Route>
            <PrivateRoute path='/homelogged' component={HomeLogged} />
            <Route path='/meal/:id' component={Meal} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
