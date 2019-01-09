import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class TimeForMeds extends Form {
  state = {
    data: { medications: "", time: "" },
    medications: [],
    timeForMeds: [
      { _id: 1, name: "7:00 AM", value: "First dose" },
      { _id: 2, name: "10:00 AM", value: "Second dose" },
      { _id: 3, name: "1:00 PM", value: "Third dose" },
      { _id: 4, name: "4:00 PM", value: "Fourth dose" },
      { _id: 5, name: "7:00 PM", value: "Fifth dose" }
    ],
    errors: {}
  };
  schema = {
    medications: Joi.string()
      .required()
      .label("Medications to Take"),
    time: Joi.string()
      .required()
      .label("Time to Take")
  };

  render() {
    return (
      <div>
        <h1>Time to Take Medications</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect(
            "time",
            "Time to take medication",
            this.state.timeForMeds
          )}
        </form>
      </div>
    );
  }
}

export default TimeForMeds;
