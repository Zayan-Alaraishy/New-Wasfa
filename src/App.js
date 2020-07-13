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
import ChefHome from './Components/Cheif/ChefHome';

function App() {
  return (
    <Router history={history}>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/explore'>
            <ChefHome />
          </Route>
          <Route path='/addmeal'>
            <AddMeal />
          </Route>
          <Route path='/tutorial'>
            <Tutorial />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/signin'>
            <SignInSide />
          </Route>
          <Route path='chefhome'>
            <ChefHome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
