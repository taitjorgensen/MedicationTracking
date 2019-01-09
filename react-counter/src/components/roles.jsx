import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class Roles extends Form {
  state = {
    data: {
      role: "",
      value: ""
    },
    roles: [
      { value: "patient", name: "Patient" },
      { value: "healthcareWorker", name: "Healthcare Provider" },
      { value: "careTaker", name: "Care Taker" }
    ],
    route: "roles",
    errors: {}
  };
  schema = {
    role: Joi.string()
      .required()
      .label("Username"),
    value: Joi.string()
      .required()
      .min(6)
      .label("Password")
  };
  render() {
    return (
      <div className="col col-6">
        <h1>Roles</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("value", "Value")}
          {this.renderSelect("role", "Role", this.state.roles)}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Roles;
