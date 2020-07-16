import React, { Component, useEffect, useContext, useState } from 'react';
import { AppBar, Toolbar, Grid, Button, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { db, firebase } from '../firebase';
import { AuthContext } from '../Auth';
import ChefBar from './Cheif/chefBar';
import LearnerBar from './Logged/learnerBar';

const Result = () => {
  const { currentUser } = useContext(AuthContext);
  const [type, setType] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        console.log(doc.data().userType);
        setType(doc.data().userType);
      });
  });

  let bar;
  if (type == 'chef') {
    bar = (
      <div>
        <ChefBar />
      </div>
    );
  } else {
    bar = (
      <div>
        <LearnerBar />
      </div>
    );
  }
  return (
    <div>
      <div>{bar}</div>
      <h2>The results of your search...</h2>
    </div>
  );
};

export default Result;
