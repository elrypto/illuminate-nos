import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Main from "./../../components/Main";


const styles = {
};

const App = ({ classes }) => (
  <div className={classes.App}>
    <Header title="illuminate - nOS dapp (prototype)" />

    <Main title="illuminate" />

    <Footer />

  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
