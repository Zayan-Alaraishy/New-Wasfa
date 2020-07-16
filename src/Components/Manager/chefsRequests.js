import React, { Component } from 'react';
import { AppBar, Toolbar, Grid, Button, Link } from '@material-ui/core';

import { db, firebase } from '../../firebase';

class ChefRequests extends Component {
  state = {};
  componentDidMount() {
    const db = firebase.firestore();
  }
  render() {
    return <div>Hello Admin </div>;
  }
}

export default ChefRequests;
