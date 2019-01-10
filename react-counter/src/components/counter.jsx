import React, { Component } from "react";
import firebase from "firebase";
import Joi from "joi-browser";
import Select from "./common/select";

class Counter extends Component {
  state = {
    selectedMedication: "",
    data: {},
    medicationPopulated: false,
    medicationSelected: false,
    imageSelected: false,
    medicationOptions: [],
    counter: [],
    route: "counter",
    errors: {}
  };
  constructor(props) {
    super(props);
    let database = firebase.database();

    var childData;
    database.ref("medications").once("value", snapshot => {
      var medicationOptions = [];
      let i = 0;
      snapshot.forEach(function(childSnapshot) {
        childData = {
          key: i,
          value: childSnapshot.val()
        };
        medicationOptions.push(childData);
        i++;
      });
      this.setState({ medicationOptions: medicationOptions });
      this.setState({ medicationPopulated: true });
      console.log(medicationOptions);
    });
  }

  schema = {
    name: Joi.string()
      .required()
      .label("Medication"),
    dosage: Joi.string()
      .required()
      .label("Dosage"),
    quantity: Joi.number()
      .integer()
      .required()
      .label("Quantity"),
    image: "",
    counter: ""
  };

  handleChange = event => {
    const input = event.target.value;
    let data = this.state.medicationOptions[input].value;
    this.setState({ data });
  };

  render() {
    let awaitList;
    let awaitImage;
    let awaitSelection;
    let awaitLoadMedication;
    let displayCounter;

    if (this.state.medicationPopulated) {
      awaitList = (
        <div className="col col-6">
          <Select
            name={"selectMedication"}
            label={"Medication"}
            options={this.state.medicationOptions}
            onChange={this.handleChange}
          />
        </div>
      );
    } else {
      awaitList = <div>Loading</div>;
    }

    if (this.state.data && this.state.data.image) {
      awaitSelection = (
        <img src={this.state.data.image} height="200" width="200" />
      );
      awaitLoadMedication = (
        <div>
          <span className="btn btn-md m-2">
            <h2>{this.getDosage()}</h2>
          </span>

          <span className="btn-info btn-md m-2">
            <h2>{this.state.medicationOptions.quantity}</h2>
          </span>

          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-success btn-md m-2"
          >
            <span className="fas fa-plus" />
          </button>

          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-warning btn-md m-2"
          >
            <span className="fas fa-minus" />
          </button>

          <button
            onClick={() => this.props.onReset(this.props.counter)}
            className="btn btn-primary btn-md m-2"
          >
            Reset
          </button>

          <button
            onClick={() => this.handleAdd()}
            className="btn btn-success btn-md m-2"
          >
            Submit
          </button>

          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-md m-2"
          >
            Remove
          </button>
        </div>
      );
    } else {
      awaitSelection = <div>Select Medication</div>;
    }
    if (this.state.medicationSelected) {
      let counter = this.state.counter;
      let i = 0;
      console.log("Check Point");
      counter.forEach(function() {
        displayCounter = (
          <span className="col col-6">
            <h2>{counter[i]}</h2>
          </span>
        );
        i++;
        console.log(counter);
      });
    }

    return (
      <center>
        <div onSubmit={this.handleSubmit} className="col col-6">
          <span>{awaitList}</span>
          <span>{awaitSelection}</span>
          <span>{awaitImage}</span>
          <div>{awaitLoadMedication}</div>
        </div>
        <div className="col col-6">{displayCounter}</div>
      </center>
    );
  }

  loadImage() {
    console.log("Display image");
    this.setState({ imageSelected: true });
  }

  formatName() {
    const medication = firebase.database().ref("medications");
    let name = medication.name;
    return name;
  }

  handleAdd() {
    var medicationToTake = this.value;
    this.state.counter.push(medicationToTake);
  }

  validate() {}

  getDosage() {
    const medication = this.state.data;
    let dosage = medication.dosage;
    return dosage;
  }

  formatCount() {
    var { quantity } = this.state.medicationOptions.quantity;
    // if (this.props.data) return quantity === 0 ? "0" : quantity;
    // else quantity = 0;
    if (quantity === null) quantity = 0;
    return quantity;
  }
}

export default Counter;
