import { Button } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import logOut from "../../actions/logOut";

const Profile = ({ auth }) => (
  <Route
    render={({ history }) => (
      <div>
        <img
          src={auth.photoURL}
          alt={auth.displayName}
          width="100"
          height="100"
        />
        <p>
          <strong>{auth.displayName}</strong>
        </p>
        <p>{auth.email}</p>
        <Button
          variant="contained"
          onClick={() => logOut().then(() => history.push(`/`))}
          style={{ backgroundColor: "#3C436B", color: "#f1eaef" }}
        >
          log out
        </Button>
      </div>
    )}
  />
);

export default Profile;
