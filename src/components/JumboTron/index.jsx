import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


class JumboTron extends React.Component {

render() {


  return(
  <React.Fragment>


      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">the microlessons community</h1>
          <p class="lead text-muted">Learn with live one on one instruction
          through livestreamed video and live chat. Teach others and earn. All with cryptocurrencies.</p>
          <p>
            <a href="#" class="btn btn-secondary my-2">Learn More</a>
            <a href="#" class="btn btn-secondary my-2">Get Started</a>
            <a href="#/provider/new" class="btn btn-primary  my-2">Register as a Provider</a>
          </p>
        </div>
      </section>


  </React.Fragment>
);
 }
}



export default (JumboTron);
