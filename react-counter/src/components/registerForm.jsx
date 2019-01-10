import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import firebase from "firebase";
import * as firebaseui from "firebaseui";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "", role: "", phoneNumber: "" },
    roles: [
      { value: "patient", name: "Patient" },
      { value: "healthcareWorker", name: "Healthcare Provider" },
      { value: "careTaker", name: "Care Taker" }
    ],
    route: "users",
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    role: Joi.string()
      .required()
      .label("Role"),
    phoneNumber: Joi.string()
      .min(10)
      .max(10)
      .required()
      .label("Phone Number")
  };

  async componentDidMount() {
    const { data: users } = await firebase.database().ref(this.state.route);
    this.setState({ users });
  }

  render() {
    return (
      <center>
        <div className="col col-6">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            <div
              onSubmit={this.handleRegister(
                this.state.data.username,
                this.state.data.password
              )}
            >
              {this.renderInput("username", "Username")}
              <p>*This must be a valid email address.</p>
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderSelect("role", "Role", this.state.roles)}
              {this.renderInput("phoneNumber", "Phone Number")}
              <p>*Number only, no dashes or spaces.</p>
              {this.renderButton("Register")}
            </div>
          </form>
        </div>
      </center>
    );
  }
  handleRegister(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
}

export default RegisterForm;
