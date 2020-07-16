import React, { Component, useEffect, useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { db, firebase } from '../firebase';
import { AuthContext } from '../Auth';
import ChefBar from './Cheif/chefBar';
import LearnerBar from './Logged/learnerBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Grid } from '@material-ui/core';
import savedEmpty from './images/savedEmpty.png';
import star from './images/star.png';

const defaultProps = {
  style: {
    width: '260px',
    height: '290px',
    borderRadius: '20px',
    marginLeft: '55px'
  }
};

const Result = props => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [type, setType] = useState(null);
  const [results, setResult] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);
  let list = [];
  useEffect(() => {
    console.log('result page =>', props.match.params.search);
    const db = firebase.firestore();
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        console.log(doc.data().userType);
        setType(doc.data().userType);
      });
    db.collection('meals')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const results = {
            id: doc.id,
            ...doc.data()
          };
          console.log(results);
          if (
            results.Ingredients !== undefined &&
            results.Ingredients.includes(props.match.params.search)
          ) {
            list.push(results);
          }
          console.log('result are ', list);
        });
        setResult(list);
      });
  }, []);

  const getMealId = clickedMealId => {
    const db = firebase.firestore();
    let SavedMealsList = [];

    db.collection('mealUserId')
      .where('currentUserUid', '==', currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, '=>', doc.data());
          const fetchedFavMealsId = doc.data().mealId;
          SavedMealsList.push(fetchedFavMealsId);
        });
        setSavedMeals(SavedMealsList);
      })
      .then(() => {
        if (savedMeals.includes(clickedMealId)) {
          alert('This meal is already saved');
        } else {
          db.collection('mealUserId').add({
            mealId: clickedMealId,
            currentUserUid: currentUser.uid
          });
          alert('This meal is saved');
        }
      });
  };

  const learnMore = clickedMealId => {
    console.log(clickedMealId);
    history.push(`/meal/${clickedMealId}`);
  };

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
      {results.map(result => (
        <Card borderRadius='50%' {...defaultProps} className='card'>
          <CardActionArea className='area'>
            <CardMedia
              className='CardImage'
              image={result.image}
              onClick={() => learnMore(result.id)}
            />
            <h1 className='Cardtitle'>{result.mealName}</h1>

            <Typography style={{ marginTop: 1 }}>
              <CardActions className='Cardactions'>
                <IconButton className='expandOpen2'>
                  <img
                    alt='saveicone'
                    className='unscheduleCard'
                    src={savedEmpty}
                    onClick={() => getMealId(result.id)}
                  />
                </IconButton>
              </CardActions>
            </Typography>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default Result;
