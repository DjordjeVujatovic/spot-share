// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { cyan500 } from 'material-ui/styles/colors';

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
  floatingLabelStyle: {
    color: cyan500,
  },
  errorStyle: {
    color: cyan500,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: '45%',
  },
};

class SignIn extends Component {
  constructor(props, onSignInClick, onSignUpClick) {
    super(props, onSignInClick, onSignUpClick);
    // this.submitAction = this.submitAction.bind(this);

    this.state = {
      fields: {
        email: '',
        password: '',
      },
      fieldErrors: {},
    };
  }

  // call validation and set data state
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
        case 'len':
          if (fields[e.target.name].length < 6) {
            const errorObject = { [e.target.name]: 'Field must be 6 characters long' };
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
    // TODO validation errors into central source
    // TODO data formats

    if (!data.email) errors.email = 'Required field';
    if (data.password.length < 6) errors.password = 'Field must be 6 characters long';
    if (!data.password) errors.password = 'Required field';

    return errors;
  }

  handleSubmit(e) {
    const login = this.state.fields;
    const fieldErrors = this.validate(login);

    this.setState({ fieldErrors });

    e.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    // submit data
    // console.log(login);
    this.props.onSignInClick(login);

    /* Meteor.loginWithPassword(login.email, login.password, (error) => {
      if (error) {
        console.log(`Login Unsucessful: ${error.reason}`);
      } else {
        this.props.router.push('/menu');

        console.log('Login Successful');
      }
    });*/
  }

  /* submitAction() {
    const { email, password } = this.state;

    // login
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(`There was an error: ${error.reason}`);
      } else {
        this.props.router.push('/menu');
        console.log('Login Successful');
      }
    });
  }*/

  /* handleInputChange(input, event) {
    const updateState = {};

    updateState[input] = event.target.value;
    this.setState(updateState);
  }*/

  render() {
    return (
      <div style={styles.component}>
        <Card style={styles.card}>
          <Paper>
            <Toolbar>
              <ToolbarTitle
                text="Sign In"
              />
            </Toolbar>
            <CardText>
              <TextField
                style={styles.textField}
                name="email"
                hintText="Email"
                errorText={this.state.fieldErrors.email}
                floatingLabelText="Email"
                // errorStyle={styles.errorStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                value={this.state.fields.email}
                // onChange={(event) => { this.handleInputChange('email', event); }}
                onChange={e => this.handleTextFieldChange(e, ['req'])}
              />
              <TextField
                style={styles.textField}
                name="password"
                hintText="Password"
                errorText={this.state.fieldErrors.password}
                floatingLabelText="Password"
                // errorStyle={styles.errorStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                type="password"
                value={this.state.fields.password}
                // onChange={(event) => { this.handleInputChange('password', event); }}
                onChange={e => this.handleTextFieldChange(e, ['req'])}
              />
              <div style={styles.buttonContainer}>
                <RaisedButton
                  style={styles.buttonStyle}
                  labelColor="black"
                  label="Login"
                  // onClick={(e) => { this.submitAction(e); }}
                  // onClick={e => this.handleSubmit(e)}
                  onClick={(e) => { this.handleSubmit(e); }}
                />
                <RaisedButton
                  style={styles.buttonStyle}
                  labelColor="black"
                  label="SignUp"
                  onClick={(e) => { this.props.onSignUpClick(e); }}
                />
              </div>
            </CardText>
          </Paper>
        </Card>
      </div>
    );
  }
}

SignIn.propTypes = {
  // router: PropTypes.object.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
};

export default SignIn;
