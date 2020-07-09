import React from 'react';

import Card from '@material-ui/core/Card';

import './Tutorial.css';

const defaultProps = {
  style: {
    width: '800px',
    height: '600px',
    borderRadius: '20px',
    center: '100%'
  }
};

const Tutorial = () => {
  return (
    <div className='Toutorial'>
      <Card borderRadius='50%' {...defaultProps} className='card'></Card>
    </div>
  );
};
export default Tutorial;
