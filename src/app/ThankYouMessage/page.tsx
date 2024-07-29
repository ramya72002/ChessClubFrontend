import React from 'react';
import './ThankYouMessage.scss';

const ThankYouMessage = () => {
  return (
    <div className="thank-you-container">
      <img src="/images/thank1.png" alt="Thank You Icon" className="thank-you-icon" />
     
      <h1>Your submission has been received.</h1>
    </div>
  );
};

export default ThankYouMessage;
