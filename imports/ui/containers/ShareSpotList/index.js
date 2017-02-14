import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

import { ParkingSpots } from '../../../api/parking-spots';
import ParkingSpot from '../../components/ParkingSpot';

import { editParkingSpot, deleteParkingSpot } from './actions';
import { setApplicationLocation } from '../App/actions';

const styles = {
  shareSpot: {
    textAlign: 'center',
  },
};

const currentLocation = 'SHARE-SPOT';

class ShareSpotList extends Component {
  componentWillMount() {
    this.props.setApplicationLocation(currentLocation);
  }

  render() {
    const parkingSpots = this.props.parkingSpotList;

    return (
      <div style={styles.shareSpot}>
        <h2>Parking Spots</h2>
        <ul>
          {parkingSpots.map(parkingSpot =>
            <ParkingSpot
              key={parkingSpot._id}
              id={parkingSpot._id}
              userId={parkingSpot.user_id}
              address={parkingSpot.address}
              availableFrom={parkingSpot.available_from}
              availableTo={parkingSpot.available_to}
              postCode={parkingSpot.post_code}
              pricePerHour={parkingSpot.price_per_hour}
              additionalInformation={parkingSpot.additional_information}
              onClickEdit={this.props.editParkingSpot}
              onClickDelete={this.props.deleteParkingSpot}
            />,
          )}
        </ul>
      </div>
    );
  }
}

/* <div>
        <ul>
          {todos.map(todo =>
            <Todo
              key={todo._id}
              {...todo}
              onClick={() => dispatch(toggleTodo(todo._id))}
            />
          )}
        </ul>
        {pagination}
</div>

const TodoContainer = createContainer(({visibilityFilter, pageSkip}) => {
  const todoSub = Meteor.subscribe('getTodos', visibilityFilter, pageSkip);

  return {
    todoSubReady: todoSub.ready(),
    todoList: Todos.find({}, {limit: 10}).fetch() || [],
    todoCount: Counts.get('TodoCount')
  };
}, TodoList);
*/

function mapStateToProps(state) {
  return {
    visibilityFilter: state.appData.visibilityFilter,
    applicationLocation: state.appData.applicationLocation,
  };
}

const mapDispatchToProps = dispatch => ({
  editParkingSpot: (id) => {
    dispatch(editParkingSpot(id));
    browserHistory.push('/sharespots/edit');
  },
  deleteParkingSpot: (id) => {
    dispatch(deleteParkingSpot(id));
  },
  setApplicationLocation: (location) => {
    dispatch(setApplicationLocation(location));
  },
});

// connect meteor pub sub
const ShareSpaceContainer = createContainer(() => {
  Meteor.subscribe('getParkingSpots');
  return {
    parkingSpotList: ParkingSpots.find({}).fetch(),
  };
}, ShareSpotList);

// proptypes validation
ShareSpotList.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  parkingSpotList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setApplicationLocation: PropTypes.func.isRequired,
  editParkingSpot: PropTypes.func.isRequired,
  deleteParkingSpot: PropTypes.func.isRequired,
};

// connect to redux
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareSpaceContainer);
