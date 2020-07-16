import React, { Component, useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Grid, Button, Link } from '@material-ui/core';
import { AuthContext } from '../../Auth';
import { useHistory } from 'react-router-dom';

import { db, firebase } from '../../firebase';

const ChefRequests = () => {
  // state = {
  //   name: '',
  //   email: '',
  //   CV: ''
  // };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [CV, setCV] = useState('');
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        console.log(doc.data().userType);
        if (doc.data().userType !== 'admin') {
          history.push('/homelogged');
        } else {
          //
        }
      });

    db.collection('users')
      .where('ChefCV', '>', '')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          setName(doc.data().Username);
          setEmail(doc.data().Email);
          setCV(doc.data().ChefCV);
        });
      });
  });

  return <div>Hello Admin </div>;
};

export default ChefRequests;
