import React, { PropTypes } from 'react';

const styles = {
  welcome: {
    // height: '85vh',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    'textAlign': 'center',
  },
  h1: {
    // 'text-align': 'center',
  },
};

const ParkingSpot = ({ id, userId, availableFrom, availableTo, pricePerHour, additionalInformation, onClick }) => (
  <li
    style={styles.welcome}
  >
    <h3>A parking spot - ID: {id}</h3>
    <p>User ID: {userId} | Available From: {availableFrom} To: {availableTo} | Price per hour: {pricePerHour}</p>
    <p>Additional Info: {additionalInformation}</p>
    <button onClick={onClick}>Edit</button>
  </li>
);

ParkingSpot.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  availableFrom: PropTypes.string.isRequired,
  availableTo: PropTypes.string.isRequired,
  pricePerHour: PropTypes.number.isRequired,
  additionalInformation: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ParkingSpot;
