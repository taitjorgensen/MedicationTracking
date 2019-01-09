import React from "react";
import firebase from "firebase";
import Joi from "joi-browser";
import Form from "./common/form";

class Counter extends Form {
  state = {
    medicationPopulated: false,
    imageSelected: false,
    data: [
      {
        dosage: "",
        image: "",
        name: "",
        quantity: "",
        patient: "",
        counter: ""
      }
    ],
    route: "counter",
    errors: {}
  };
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
    // route: Joi.string()
  };

  async componentDidMount() {
    let database = firebase.database();

    var childData;
    database.ref("medications").once("value", snapshot => {
      var medicationOptions = [];
      snapshot.forEach(function(childSnapshot) {
        childData = childSnapshot.val();
        medicationOptions.push(childData);
        console.log(medicationOptions);
      });
      this.setState({ data: medicationOptions });
      this.setState({ medicationPopulated: true });
    });
  }
  render() {
    let awaitList;
    let awaitImage;
    //let awaitDosage;
    if (this.state.medicationPopulated) {
      awaitList = (
        <h2 className="col col-6">
          {this.renderSelect("name", "Medication", this.state.data)}
        </h2>
      );
    } else {
      awaitList = <div>Loading</div>;
    }
    if (this.state.imageSelected) {
      awaitImage = (
        <img src={this.state.data.image} height="60" width="60" alt="" />
      );
    } else {
      awaitImage = <div>Select Medication</div>;
    }

    return (
      <center>
        <form onSubmit={this.handleSubmit} className="col col-8">
          <span>{awaitImage}</span>
          <span onClick={() => this.getImage()}>{awaitList}</span>

          <span className="btn btn-md m-2">
            <h2>{this.getDosage()}</h2>
          </span>

          <span className="btn-info btn-md m-2">
            <h2>{this.state.data.quantity}</h2>
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
            disabled={this.validate()}
            onClick={() => this.componentDidMount.bind(this)}
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
        </form>
      </center>
    );
  }

  // async componentDidMount() {
  //   const { counter } = await firebase.database().ref(this.state.route);
  //   this.setState({ counter });
  // }

  // getMedicationName() {
  //   let medication = "badge m-3 badge-alert";
  //   medication += firebase.database().ref("medications");
  //   let name = medication.name;
  //   return name;
  // }
  getImage(event) {
    if (this.state.imageSelected) {
      this.setState({ data: event.target.data });
      this.state.imageSelected = true;
    } else {
    }
  }

  formatName() {
    const medication = firebase.database().ref("medications");
    let name = medication.name;
    return name;
  }

  getDosage() {
    const medication = this.state.data;
    let dosage = medication.dosage;
    return dosage;
  }

  // getBadgeClasses() {
  //   let classes = "btn ";
  //   if (this.props.data)
  //     classes +=
  //       this.props.data.quantity === 0 ? "btn-md m-2" : "btn-info btn-md m-2";
  //   else classes += "btn-md m2";
  //   return classes;
  // }

  formatCount() {
    var { quantity } = this.state.data.quantity;
    // if (this.props.data) return quantity === 0 ? "0" : quantity;
    // else quantity = 0;
    if (quantity === null) quantity = 0;
    return quantity;
  }
}

export default Counter;
