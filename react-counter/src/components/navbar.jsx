import React from "react";
import { Link, NavLink } from "react-router-dom";
import Form from "./common/form";

// Stateless Functional Component
const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        My
        <span className="fas fa-file-prescription" />{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-item nav-link" to="/patients">
            Patients
          </NavLink>
          <NavLink className="nav-item nav-link" to="/medications">
            Medications
          </NavLink>
          <NavLink className="nav-item nav-link" to="/newMedication">
            Add Medication
          </NavLink>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
          {/* <Form>
            <button
              onClick={this.handleSignOut}
              type="button"
              class="btn btn-primary"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
            >
              Sign Out
            </button>
          </Form> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
