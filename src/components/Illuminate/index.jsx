import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { nosPropTypes } from "@nosplatform/api-functions/es6";

import { injectNOS } from "../../nos";



class Illuminate extends React.Component {

}

export default injectNOS(injectSheet(styles)(Illuminate));
