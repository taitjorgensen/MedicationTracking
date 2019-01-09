import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import firebase from "firebase";
import Form from "./common/form";

class Counters extends Form {
  state = {
    data: {
      counters: [{}],
      timeOptions: [{}]
    },
    route: "counters",
    errors: {}
  };
  schema = {
    counters: Joi.string()
      .required()
      .label("Medications to take"),
    timeOptions: Joi.string()
      .required()
      .label("Time to take")
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (counters[index].value > 0) {
      counters[index].value--;
    }
    this.setState({ counters });
  };

  handleResetAll = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleReset = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = 0;
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  async componentDidMount() {
    const { data: counters } = await firebase.database().ref(this.state.route);
    this.setState({ counters });
  }

  activeCounters() {
    const totalCounters = this.state.data.counters.filter(c => c.value > 0)
      .length;
    return totalCounters;
  }

  retrieveCounter() {
    const counter = firebase.database().ref("counter");
    const counters = [...counter];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    this.setState({ counters });
  }

  retrieveTimeOptions() {
    const timeOptions = [...firebase.database().ref("timeOptions")];
    this.setState({ timeOptions });
  }
  // render() {
  //   const {
  //     onReset,
  //     counters,
  //     onDelete,
  //     onIncrement,
  //     onDecrement
  //   } = this.props;
  //   return (
  //     <React.Fragment>
  //       <span>
  //         {counters.map(counter => (
  //           <Counter
  //             key={counter.id}
  //             onReset={onReset}
  //             onDelete={onDelete}
  //             onIncrement={onIncrement}
  //             onDecrement={onDecrement}
  //             counter={counter}
  //           />
  //         ))}
  //       </span>
  //     </React.Fragment>
  //   );
  // }
  render() {
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
              {this.activeCounters()}
            </span>
            <form onSubmit={this.handleSubmit}>
              {this.renderSelect(
                "counters",
                "Select Medication",
                this.state.data
              )}
              {this.renderSelect(
                "timeForMeds",
                "Select Time for Medications",
                this.state.value
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
              counters={this.state.counters}
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

export default Counters;
