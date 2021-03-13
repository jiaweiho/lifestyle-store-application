import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { initiateLogin } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMsg: ''
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const fieldsToValidate = [{ email }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: 'Please enter all the fields.'
        }
      });
    } else {
      this.setState({
        errorMsg: {
          signin_error: ''
        }
      }); 
      // login successful
      this.props.dispatch(initiateLogin(email, password));
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { errorMsg } = this.state;
    return (
      <div className="hero is fullheight is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-8 is-offset-2">
              <h3 className="title has-text-white">Lifestyle Store</h3>
              <hr className="login-hr"/>
              <p className="subtitle has-text-white">Please login to change your lifestyle!</p>
              <div className="box">
                <div className="box">
                  <img src="logo192.png" alt="logo"/>
                  {errorMsg && errorMsg.signin_error && (
                    <p className="errorMsg centered-message">
                      {errorMsg.signin_error}
                    </p>
                  )}
                  <Form onSubmit={this.handleLogin}>
                    <div className="field">
                      <div className="control">
                        <Form.Group controlId="email">
                          {/* <Form.Label>Email address</Form.Label> */}
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={this.handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="password">
                          {/* <Form.Label>Password</Form.Label> */}
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={this.handleInputChange}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="action-items">
                      <Button className="button is-block is-danger is-large" variant="primary" type="submit">
                        Login
                      </Button>
                      <Link to="/register" className="btn btn-secondary">
                        Create account
                      </Link>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Login);