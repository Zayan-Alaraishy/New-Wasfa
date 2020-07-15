import React, { Component } from 'react';
import Card from '../Card/Card';
import LearnerBar from './learnerBar';
import ChefBar from '../Cheif/chefBar';
import { firebase } from '../../firebase';

class HomeLogged extends Component {
  state = {
    chef: null
  };
  componentDidMount() {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            console.log(doc.data());
            const fetchedType = doc.data().userType;
            console.log(fetchedType);
            if (fetchedType == 'chef') {
              this.setState({ chef: true });
            } else {
            }
          });
      } else {
        // User not logged in or has just logged out.
      }
    });
  }
  render() {
    let bar;
    if (this.state.chef) {
      bar = (
        <div>
          <ChefBar {...this.props} />
        </div>
      );
    } else {
      bar = (
        <div>
          <LearnerBar {...this.props} />
        </div>
      );
    }
    return (
      <div>
        <h2
          style={{
            marginTop: 80,
            textAlign: 'left',
            marginLeft: 60,
            marginBottom: 8,
            fontFamily: 'arial'
          }}
        >
          All recipes
        </h2>
        <div>{bar}</div>
        <Card />
      </div>
    );
  }
}

export default HomeLogged;
