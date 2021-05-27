import CssBaseline from '@material-ui/core/CssBaseline';
import Firebase from "firebase/app";
import React from "react";
import { FirestoreProvider } from "react-firestore";
import { BrowserRouter, Route } from "react-router-dom";
import "../styles/global.css";
import Layout from "./layout/Layout";
import ErrorBoundary from "./misc/ErrorBoundary";
import Routes from "./Routes";

const App = () => (
  <FirestoreProvider firebase={Firebase}>
  <CssBaseline />
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Route path="/" component={ScrollToTop} />
          <Routes />
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  </FirestoreProvider>
);

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return null;
  }
}

export default App;
