import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';
import { registerNewUser } from '../actions/auth';
import { resetErrors } from '../actions/errors';

class Register extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
    successMsg: '',
    errorMsg: '',
    isSubmitted: false
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  registerUser = (event) => {
    event.preventDefault();
    const { first_name, last_name, email, password, cpassword } = this.state;

    const fieldsToValidate = [
      { first_name },
      { last_name },
      { email },
      { password },
      { cpassword }
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signup_error: 'Please enter all the fields.'
        }
      });
    } else {
      if (password !== cpassword) {
        this.setState({
          errorMsg: {
            signup_error: 'Password and confirm password does not match.'
          }
        });
      } else {
        this.setState({ isSubmitted: true });
        this.props
          .dispatch(registerNewUser({ first_name, last_name, email, password }))
          .then((response) => {
            if (response.success) {
              this.setState({
                successMsg: 'User registered successfully.',
                errorMsg: ''
              });
            }
          });
      }
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { errorMsg, successMsg, isSubmitted } = this.state;
    return (
      <div className="hero is fullheight is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-8 is-offset-2">
              <h3 className="title has-text-white">Lifestyle Store</h3>
              <hr className="login-hr"/>
              <p className="subtitle has-text-white">Please register</p>
              <div className="box">
                <div className="box">
                  <img src="logo192.png" alt="logo"/>
                  {errorMsg && errorMsg.signup_error ? (
                    <p className="errorMsg centered-message">
                      {errorMsg.signup_error}
                    </p>
                    ) : (
                      isSubmitted && (
                        <p className="successMsg centered-message">{successMsg}</p>
                      )
                    )}
                  <Form onSubmit={this.registerUser}>
                    <Form.Group controlId="first_name">
                      <Form.Control
                        type="text"
                        name="first_name"
                        placeholder="Enter first name"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="last_name">
                      <Form.Control
                        type="text"
                        name="last_name"
                        placeholder="Enter last name"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="cpassword">
                      <Form.Control
                        type="password"
                        name="cpassword"
                        placeholder="Enter confirm password"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <div className="action-items">
                      <Button className="button is-block is-danger is-large" variant="primary" type="submit">
                        Register
                      </Button>
                      <Link to="/" className="btn btn-secondary">
                        Login
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

export default connect(mapStateToProps)(Register);