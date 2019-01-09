import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Patients from "./components/patients";
import Medications from "./components/medications";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MedicationForm from "./components/medicationForm";
import TimeForMeds from "./components/timeForMeds";
import Counters from "./components/counters";
import Counter from "./components/counter";
import Roles from "./components/roles";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "./App.css";

class App extends Component {
  componentWillMount() {
    var config = {};
    firebase.initializeApp(config);
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/patients" component={Patients} />
            <Route path="/medications" component={Medications} />
            <Route path="/newMedication" component={MedicationForm} />
            <Route path="/timeForMeds" component={TimeForMeds} />
            <Route path="/counter" component={Counter} />
            <Route path="/counters" component={Counters} />
            <Route path="/roles" component={Roles} />
            <Redirect from="/" exact to="/medications" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
