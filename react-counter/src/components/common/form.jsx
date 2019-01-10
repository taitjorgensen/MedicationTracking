import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import firebase from "firebase";

class Form extends Component {
  state = {
    data: {},
    route: {},
    errors: {}
  };
  async componentDidMount() {
    const { data: value } = await firebase.database().ref(this.state.route);
    this.setState({ value });
  }
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    const obj = this.state.data;
    const itemRef = await firebase.database().ref(this.state.route);
    itemRef.push(obj);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.props.history.push("/medications");
    //call server
  };

  handleChange = event => {
    const errors = { ...this.state.errors };
    const input = event.target.value;
    console.log("Input  " + input);
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];

    let data = { ...this.state.data };
    data = input.value;
    this.setState({ data });
  };

  handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {});
    this.props.history.push("/login");
  }

  renderButton(label) {
    return (
      <button
        //disabled={this.validate()}
        onClick={() => this.componentDidMount.bind(this)}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, route, errors } = this.state;

    return (
      <Select
        name={name}
        value={data}
        label={label}
        options={options}
        onChange={this.handleChange}
        route={route}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, route, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        route={route}
        error={errors[name]}
      />
    );
  }
}

export default Form;
