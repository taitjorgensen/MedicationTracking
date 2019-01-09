import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import firebase from "firebase";

class MedicationForm extends Form {
  state = {
    data: {
      name: "",
      dosage: "",
      image: "",
      quantity: "",
      patient: "",
      counter: "",
      counters: ""
    },
    images: [],
    route: "medications",
    errors: {}
  };

  schema = {
    route: Joi.string(),
    name: Joi.string()
      .required()
      .label("Medication Name"),
    dosage: Joi.string()
      .required()
      .label("Dosage"),
    image: Joi.string().label("Image")
  };

  async componentDidMount() {
    var { data: medication } = await firebase.database().ref(this.state.route);
    this.setState({ medication });
  }

  handleAdd = async data => {
    const obj = data;
    const medication = await firebase.database().ref(this.state.route, obj);
    const medications = [medication, ...this.state.medications];
    this.setState({ medications });
    console.log("Submitted");
  };

  handleUpdate = async medication => {
    await firebase
      .database()
      .ref(this.state.route + "/" + medication.id, medication);
    const medications = [...this.state.medications];
    const index = medications.indexOf(medication);
    medications[index] = { ...medication };
    this.setState({ medications });
  };

  mapToViewModel(medication) {
    return {
      name: medication.name,
      dosage: medication.dosage
    };
  }

  render() {
    return (
      <center>
        <div className="col col-4">
          <h1>New Medication</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("dosage", "Dosage")}
            {this.renderInput("image", "Image")}
            {this.renderButton("Save")}
          </form>
        </div>
      </center>
    );
  }
}

export default MedicationForm;
