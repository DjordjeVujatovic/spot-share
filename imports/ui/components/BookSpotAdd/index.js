import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
// import { addParkingSpot } from '../../containers/ShareSpotInput/actions';

import { setApplicationLocation } from '../../containers/App/actions';



const currentLocation = 'BOOK-SPOT';

class BookSpotAdd extends Component {
  constructor() {
    super();

    this.state = {
      fields: {},
      fieldErrors: {},
    };
  }

  componentWillMount() {
    this.props.setApplicationLocation(currentLocation);
  }

  handleTextFieldChange(e, validation) {
    const fieldErrors = this.state.fieldErrors;
    delete fieldErrors[e.target.name];

    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;

    validation.forEach((type) => {
      switch (type) {
        case 'req':
          if (!fields[e.target.name]) {
            const errorObject = { [e.target.name]: 'Required field' };
            this.setState({ fieldErrors: { ...this.state.fieldErrors, ...errorObject } });
          }
          break;
        case 'num':
          if (isNaN(fields[e.target.name])) {
            const errorObject = { [e.target.name]: 'Number required' };
            this.setState({ fieldErrors: { ...this.state.fieldErrors, ...errorObject } });
          }
          break;
        default:
      }
    });

    this.setState({ fields });
  }

  validate(data) {
    this.setState({
      fieldErrors: {},
    });
    const errors = {};
    // TODO date comparison
    // TODO validation errors into central source
    // TODO data formats

    return errors;
  }
  handleSubmit(e) {
    const bookingSpot = this.state.fields;
    const fieldErrors = this.validate(bookingSpot);

    this.setState({ fieldErrors });

    e.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    // submit data
    this.props.addBookSpot(bookingSpot);

    // navigate to list
    browserHistory.push('/bookspot/list');
  }

  render() {
    const styles = {
      component: {
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      card: {
        width: '500px',
      },
      textField: {
        width: '100%',
      },
      textFieldSmall: {
        width: '50%',
      },
      datePickerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    };
    return (
      <div>
        <div style={styles.component}>
          <Card style={styles.card}>
            <Paper>
              <Toolbar>
                <ToolbarTitle text="Add a new spot to share" />
              </Toolbar>
              <CardText>
                <form>
                  <div style={styles.datePickerContainer}>
                    <DatePicker
                      textFieldStyle={{ width: '100%' }}
                      floatingLabelText="Date Booked"
                      errorText={this.state.fieldErrors.availableFrom}
                      hintText="Available from"
                      container="inline"
                      autoOk
                      value={this.state.fields.availableFrom}
                      onChange={(x, d) => { this.setState({ fields: { ...this.state.fields, availableFrom: d } }); }}
                    />
                    <TimePicker
                      format="ampm"
                      hintText="12hr Format"
                      value={this.state.value12}
                    />
                  </div>
                  <TextField
                    style={styles.textField}
                    name="duration"
                    hintText="Duration"
                    errorText={this.state.fieldErrors.duration}
                    floatingLabelText="Duration"
                    value={this.state.fields.duration}
                    onChange={e => this.handleTextFieldChange(e, ['req'])}
                  />
                  <TextField
                    style={styles.textField}
                    name="bookingCost"
                    hintText="Booking Cost"
                    errorText={this.state.fieldErrors.bookingCost}
                    floatingLabelText="Booking Cost"
                    value={this.state.fields.bookingCost}
                  // onChange={this.handleTextFieldChange.bind(this)}
                    onChange={e => this.handleTextFieldChange(e, ['req'])}
                  />
                  <RaisedButton
                    // backgroundColor="rgb(183, 28, 28)"
                    // labelColor="white"
                    label="Submit"
                    onClick={e => this.handleSubmit(e)}
                  />

                  <Link
                    to="/bookspot/list"
                  >
                    <RaisedButton
                      label="Cancel"
                    />
                  </Link>
                </form>
              </CardText>
            </Paper>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    applicationLocation: state.appData.applicationLocation,
  };
}

const mapDispatchToProps = dispatch => ({
  setApplicationLocation: (location) => {
    dispatch(setApplicationLocation(location));
  },
});

BookSpotAdd.propTypes = {
  addBookSpot: PropTypes.func.isRequired,
  setApplicationLocation: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookSpotAdd);

