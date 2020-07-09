import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Explore from './Components/Home/Explore';
import history from './History';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router history={history}>
      <div className='App'>
        <Switch>
          <Route path='/explore'>
            <Explore />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
