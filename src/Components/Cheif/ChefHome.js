import React, { Component } from 'react';
import ChefBar from './chefBar';
import Card from '../Card/Card';
import { AppBar, Toolbar, Grid, Button, Link } from '@material-ui/core';
import UserBar from '../user/userBar';

class ChefHome extends Component {
  render() {
    return (
      <div>
        {/* <ChefBar /> */}
        <h1>Heder</h1>

        <UserBar />

        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

export default ChefHome;
