import React from "react";
import { Link } from "react-router-dom";
import Counters from "./counters";
import firebase from "firebase";
import Form from "./common/form";
import Joi from "joi-browser";

class Medications extends Form {
  state = {
    isLoggedIn: false,
    medications: [],
    timeForMeds: [],
    data: { name: "", dosage: "" },
    route: "medicationsToTake",
    errors: {}
  };
  schema = {
    medications: Joi.string()
      .required()
      .label("Medications to take"),
    timeForMeds: Joi.string()
      .required()
      .label("Time to take")
  };

  async componentDidMount() {
    const { timeForMeds } = await firebase.database().ref("timeOptions");
    const { medications } = await firebase.database().ref(this.state.route);
    this.setState({ medications, timeForMeds });
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

  render() {
    const totalCounters = this.state.counters.filter(c => c.value > 0).length;
    return (
      <React.Fragment>
        <div>
          <span>
            <span
              className="fas fa-prescription-bottle-alt"
              style={{ fontSize: "50px" }}
            />
            <span style={{ fontSize: "50px" }}> Medications to Take: </span>
            <span
              className="badge badge-pill badge-primary"
              style={{ fontSize: "30px" }}
            >
              {totalCounters}
            </span>
            <form onSubmit={this.handleAdd}>
              {this.renderSelect(
                "medications",
                "Select Medication",
                this.state.medications
              )}
              {this.renderSelect(
                "timeForMeds",
                "Select Time for Medications",
                this.state.timeForMeds
              )}
              <button
                disabled={this.validate()}
                onClick={() => this.componentDidMount.bind(this)}
                className="btn btn-success btn-md m-2"
              >
                Submit
              </button>
            </form>
          </span>
          <table className="container">
            <Counters
              counters={this.state.data.counters}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          </table>
          <span>
            <Link
              to="/newMedication"
              className="btn btn-info"
              style={{ marginBottom: 15, marginLeft: 30 }}
            >
              Add Medication
            </Link>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Medications;
