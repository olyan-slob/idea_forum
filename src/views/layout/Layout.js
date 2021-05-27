// this Layout component wraps every page with the app header on top
// check out App.js to see how it's used

import { Avatar, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { FirestoreDocument } from "react-firestore";
import logIn from "../../actions/logIn";
import { Footer, Header, HeaderFooterWrapper } from "../../styles/layout";
import { HeaderLink } from "../../styles/links";
import FirebaseAuth from "../misc/FirebaseAuth";

const Layout = ({ children }) => (
  <HeaderFooterWrapper>
    <Header>
      <HeaderLink to="/">Idea.org</HeaderLink>

      <div style={{ float: "right" }}>
        <FirebaseAuth>
          {({ isLoading, error, auth }) => {
            if (isLoading) {
              return <CircularProgress disableShrink />;
            }
            if (error) {
              return "⚠️ login error";
            }
            if (auth) {
              return (
                <HeaderLink to={`/account`}>
                  <FirestoreDocument path={`/users/${auth.uid}`}>
                    {(user) => {
                      if (user.isLoading) {
                        return <CircularProgress disableShrink />;
                      }
                      return <Avatar src={user.data?.avatar} />;
                    }}
                  </FirestoreDocument>
                </HeaderLink>
              );
            } else {
              return (
                <Button
                  variant="contained"
                  onClick={logIn}
                  style={{
                    backgroundColor: "#f1eaef",
                    color: "#3C436B",
                    marginTop: "10px",
                  }}
                >
                  log in
                </Button>
              );
            }
          }}
        </FirebaseAuth>
      </div>
    </Header>

    {children}

    <Footer>© {new Date().getFullYear()}</Footer>
  </HeaderFooterWrapper>
);

export default Layout;
