import React, { useState, useContext, useEffect } from 'react';
import { firebase } from '../../firebase';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

import savedEmpty from '../images/savedEmpty.png';
import { AuthContext } from '../../Auth';
import ChefBar from './chefBar';

const defaultProps = {
  style: {
    width: '260px',
    height: '290px',
    borderRadius: '20px',
    marginLeft: '55px'
  }
};
export default function MyMeals() {
  let history = useHistory();

  const { currentUser } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [uid, setUid] = useState(currentUser.uid);
  const [mealId, setMealId] = useState(null);
  useEffect(() => {
    console.log('The user id is =>' + uid);

    const db = firebase.firestore();
    let list = [];

    db.collection('meals')
      .where('usid', '==', uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const fetchedMealData = {
            id: doc.id,
            ...doc.data()
          };
          list.push(fetchedMealData);
          console.log(list);

          // meals.push(fetchedMealData);
        });
        setMeals(list);
      });
  }, []);

  const learnMore = clickedMealId => {
    console.log(clickedMealId);
    history.push(`/meal/${clickedMealId}`);
  };
  console.log(meals);
  return (
    <div>
      <ChefBar />
      <h1> {''}}</h1>

      {meals.map(meal => (
        <Card {...defaultProps} className='card'>
          <CardActionArea className='area'>
            <CardMedia
              className='CardImage'
              image={meal.image}
              onClick={() => learnMore(meal.id)}
            />
            <h1 className='Cardtitle'>{meal.mealName}</h1>

            <Typography>
              <CardActions className='Cardactions'>
                <IconButton className='expandOpen1'>
                  <img alt='saveicone' className='saveCard' src={savedEmpty} />
                </IconButton>
              </CardActions>
            </Typography>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
