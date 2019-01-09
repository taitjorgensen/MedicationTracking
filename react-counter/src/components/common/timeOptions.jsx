import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import firebase from "firebase";

class TimeOptions extends Form {
  state = {
    data: { time: "" },
    times: [
      { name: "12:00 AM", value: "0:00" },
      { name: "12:30 AM", value: "0:30" },
      { name: "1:00 AM", value: "1:00" },
      { name: "1:30 AM", value: "1:30" },
      { name: "2:00 AM", value: "1:00" },
      { name: "2:30 AM", value: "2:30" },
      { name: "3:00 AM", value: "1:00" },
      { name: "3:30 AM", value: "3:30" },
      { name: "4:00 AM", value: "4:00" },
      { name: "4:30 AM", value: "4:30" },
      { name: "5:00 AM", value: "5:00" },
      { name: "5:30 AM", value: "5:30" },
      { name: "6:00 AM", value: "6:00" },
      { name: "6:30 AM", value: "6:30" },
      { name: "7:00 AM", value: "7:00" },
      { name: "7:30 AM", value: "7:30" },
      { name: "8:00 AM", value: "8:00" },
      { name: "8:30 AM", value: "8:30" },
      { name: "9:00 AM", value: "9:00" },
      { name: "9:30 AM", value: "9:30" },
      { name: "10:00 AM", value: "10:00" },
      { name: "10:30 AM", value: "10:30" },
      { name: "11:00 AM", value: "11:00" },
      { name: "11:30 AM", value: "11:30" },
      { name: "12:00 PM", value: "12:00" },
      { name: "12:30 PM", value: "12:30" },
      { name: "1:00 PM", value: "13:00" },
      { name: "1:30 PM", value: "13:30" },
      { name: "2:00 PM", value: "14:00" },
      { name: "2:30 PM", value: "14:30" },
      { name: "3:00 PM", value: "15:00" },
      { name: "3:30 PM", value: "15:30" },
      { name: "4:00 PM", value: "16:00" },
      { name: "4:30 PM", value: "16:30" },
      { name: "5:00 PM", value: "17:00" },
      { name: "5:30 PM", value: "17:30" },
      { name: "6:00 PM", value: "18:00" },
      { name: "6:30 PM", value: "18:30" },
      { name: "7:00 PM", value: "19:00" },
      { name: "7:30 PM", value: "19:30" },
      { name: "8:00 PM", value: "20:00" },
      { name: "8:30 PM", value: "20:30" },
      { name: "9:00 PM", value: "21:00" },
      { name: "9:30 PM", value: "21:30" },
      { name: "10:00 PM", value: "22:00" },
      { name: "10:30 PM", value: "22:30" },
      { name: "11:00 PM", value: "23:00" },
      { name: "11:30 PM", value: "23:30" }
    ],
    route: "timeOptions",
    errors: {}
  };

  schema = {
    time: Joi.string()
      .required()
      .label("Time Option"),
    route: Joi.string()
  };

  async componentDidMount() {
    const { data: timeOptions } = await firebase
      .database()
      .ref(this.state.route);
    this.setState({ timeOptions });
  }

  render() {
    return (
      <center>
        <div className="col col-3">
          <h1>Time Options</h1>

          <form onSubmit={this.handleSubmit}>
            {this.renderSelect("time", "Time", this.state.times)}
            {this.renderButton("Save")}
          </form>
        </div>
      </center>
    );
  }
}

export default TimeOptions;
