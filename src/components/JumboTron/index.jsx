import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


class JumboTron extends React.Component {

render() {

  return(
  <React.Fragment>


      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">The Microlessons community</h1>
          <p class="lead text-muted">Experts are waiting to offer one on one instruction.
          Teach others and earn. All with the GAS(neoGAS) cryptocurrency.</p>
          <p>
            <a href="#" class="btn btn-secondary my-2">Get Started</a>
            <a href="#" class="btn btn-secondary my-2">Learn More</a>
            <a href="#" class="btn btn-primary  my-2">Register as a Lessons Provider</a>
          </p>
        </div>
      </section>


  </React.Fragment>
);
 }
}



export default (JumboTron);
