import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {
};

const Footer = ({ classes }) => (
  <footer class="text-muted">
    <div class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>&copy; illuminate</p>
      <p><small>v0.3</small></p>
    </div>
  </footer>

);

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Footer);
