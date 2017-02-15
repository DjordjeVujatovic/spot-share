import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
// import { addParkingSpot } from '../../containers/ShareSpotInput/actions';

class ShareSpotAdd extends Component {
  constructor() {
    super();

    this.state = {
      fields: {},
      fieldErrors: {},
    };
  }

  /* componentWillUnmount() {
    this.props.addParkingSpot();
  }*/

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

    if (!data.address) errors.address = 'Required field';
    if (!data.postCode) errors.postCode = 'Required field';
    if (isNaN(data.longitude)) errors.longitude = 'Number required';
    if (!data.longitude) errors.longitude = 'Required field';
    if (isNaN(data.latitude)) errors.latitude = 'Number required';
    if (!data.latitude) errors.latitude = 'Required field';
    if (!data.availableFrom) errors.availableFrom = 'Required field';
    if (!data.availableTo) errors.availableTo = 'Required field';
    if (isNaN(data.pricePerHour)) errors.pricePerHour = 'Number required';
    if (!data.pricePerHour) errors.pricePerHour = 'Required field';

    return errors;
  }

  handleSubmit(e) {
    const parkingSpot = this.state.fields;
    const fieldErrors = this.validate(parkingSpot);

    this.setState({ fieldErrors });

    e.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    // submit data
    this.props.addShareSpot(parkingSpot);

    // navigate to list
    browserHistory.push('/sharespot/list');
  }

  render() {
    const styles = {
      'new-share-spot': {
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      card: {
        width: '480px',
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
      <div style={styles['new-share-spot']}>
        <Card style={styles.card}>
          <Paper>
            <Toolbar>
              <ToolbarTitle text="Add a new spot to share" />
            </Toolbar>
            <CardText>
              <form>
                <TextField
                  style={styles.textField}
                  name="address"
                  hintText="Address"
                  errorText={this.state.fieldErrors.address}
                  floatingLabelText="Address"
                  value={this.state.fields.address}
                  onChange={e => this.handleTextFieldChange(e, ['req'])}
                />

                <TextField
                  style={styles.textField}
                  name="postCode"
                  hintText="Post Code"
                  errorText={this.state.fieldErrors.postCode}
                  floatingLabelText="Post Code"
                  value={this.state.fields.postCode}
                  // onChange={this.handleTextFieldChange.bind(this)}
                  onChange={e => this.handleTextFieldChange(e, ['req'])}
                />

                <TextField
                  style={styles.textFieldSmall}
                  name="longitude"
                  hintText="Longitude"
                  errorText={this.state.fieldErrors.longitude}
                  floatingLabelText="Longitude"
                  value={this.state.fields.longitude}
                  onChange={e => this.handleTextFieldChange(e, ['req', 'num'])}
                />

                <TextField
                  style={styles.textFieldSmall}
                  name="latitude"
                  hintText="Latitude"
                  errorText={this.state.fieldErrors.latitude}
                  floatingLabelText="Latitude"
                  value={this.state.fields.latitude}
                  onChange={e => this.handleTextFieldChange(e, ['req', 'num'])}
                />

                <div style={styles.datePickerContainer}>
                  <DatePicker
                    textFieldStyle={{ width: '100%' }}
                    floatingLabelText="Available from"
                    errorText={this.state.fieldErrors.availableFrom}
                    hintText="Available from"
                    container="inline"
                    autoOk
                    value={this.state.fields.availableFrom}
                    onChange={(x, d) => { this.setState({ fields: { ...this.state.fields, availableFrom: d } }); }}
                  />

                  <DatePicker
                    textFieldStyle={{ width: '100%' }}
                    floatingLabelText="Available to"
                    errorText={this.state.fieldErrors.availableTo}
                    hintText="Available to"
                    container="inline"
                    autoOk
                    value={this.state.fields.availableTo}
                    onChange={(x, d) => { this.setState({ fields: { ...this.state.fields, availableTo: d } }); }}
                  />
                </div>

                <TextField
                  style={styles.textField}
                  name="pricePerHour"
                  hintText="Price per hour"
                  errorText={this.state.fieldErrors.pricePerHour}
                  floatingLabelText="Price per hour"
                  value={this.state.fields.pricePerHour}
                  onChange={e => this.handleTextFieldChange(e, ['req', 'num'])}
                />

                <TextField
                  style={styles.textField}
                  name="additionalInformation"
                  hintText={this.state.fieldErrors.additionalInformation}
                  floatingLabelText="Additional Information"
                  multiLine
                  rows={3}
                  value={this.state.fields.additionalInformation}
                  onChange={e => this.handleTextFieldChange(e, [])}
                />

                <RaisedButton
                  // backgroundColor="rgb(183, 28, 28)"
                  // labelColor="white"
                  label="Submit"
                  onClick={e => this.handleSubmit(e)}
                />

                <Link
                  to="/sharespots/list"
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
    );
  }
}

/* const mapDispatchToProps = dispatch => ({
  addParkingSpot: () => {
    dispatch(addParkingSpot());
  },
});*/

ShareSpotAdd.propTypes = {
  addShareSpot: PropTypes.func.isRequired,
};

export default ShareSpotAdd;
