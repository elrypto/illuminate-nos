import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import Header from "./../../components/Header";
import JumboTron from "./../../components/JumboTron";
import Main from "./../../components/Main";
import Footer from "./../../components/Footer";
import NOSActions from "./../../components/NOSActions"


const styles = {
};

const App = ({ classes }) => (
  <div className={classes.App}>
    <Header title="illuminate - nOS dapp (prototype)" />

    <JumboTron />

    <Main title="illuminate" />

    <Footer />

  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
