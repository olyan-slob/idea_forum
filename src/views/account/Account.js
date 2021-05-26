import React from "react";
import logIn from "../../actions/logIn";
import { Page } from "../../styles/layout";
import Error from "../misc/Error";
import FirebaseAuth from "../misc/FirebaseAuth";
import Profile from "./Profile";

const Account = () => (
  <Page>
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (isLoading) {
          return <p>loading...</p>;
        }

        if (error) {
          return <Error error={error} />;
        }

        if (!auth) {
          return (
            <div>
              <p>Log in to see your account</p>
              <button onClick={logIn}>Log in</button>
            </div>
          );
        }

        return (
          <div>
            <Profile auth={auth} />
          </div>
        );
      }}
    </FirebaseAuth>
  </Page>
);

export default Account;
