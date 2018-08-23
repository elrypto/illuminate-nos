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
      <p>powered by <img class="footer-logo" src={require('/assets/nos-logo-circle-122x122.png')} alt="nOS logo"/> <a class="text-black" href="http://nos.io">nOS</a></p>
    </div>
  </footer>

);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Footer);
