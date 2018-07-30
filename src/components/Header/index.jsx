import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";

const { injectNOS, nosProps } = react.default;

const styles = {};


class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      neoAddress: "...",
    }
  }

  componentDidMount(){
    var p = [];
    var val;

    p.push(this.handleGetAddress());
    Promise.all(p).then(result => {
      val = result.toString();
      this.setState({
        neoAddress: val
      })
    });

    //console.log("neoAddress:" + this.state.neoAddress);
    //console.log("neo Balance:" + this.state.neoLastBalance);
  }


  handleGetAddress = async () => await this.props.nos.getAddress();
//  handleGetBalance = async () => await this.props.nos.getBalance({ asset: neo });

  render() {
    const { classes, nos } = this.props;

    return (
      <React.Fragment>
        <header>
          <div class="collapse bg-dark" id="navbarHeader">
            <div class="container">
              <div class="row">
                <div class="col-sm-8 col-md-7 py-4">
                  <h4 class="text-white">About</h4>
                  <p class="text-muted">illuminate is a micro lesson community where
                  you can find real people to teach you how to do anything. If you
                  have something to teach, you can earn from those willing to pay
                  for it. All payments are based on cryptocurrencies (like bitcoin),
                  but we use the NeoGas (GAS) token.
                  . <a href="#" class="text-white">Why NEO?</a></p>
                </div>
                <div class="col-sm-4 offset-md-1 py-4">
                  <h4 class="text-white">"Me"</h4>
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-white">Profile</a></li>
                    <li><a href="#" class="text-white">Site History</a></li>
                    <li class="text-white">NEO Addr -  ({this.state.neoAddress.substring(0,12) + "..."})</li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
          <div class="navbar navbar-dark bg-dark box-shadow">
            <div class="container d-flex justify-content-between">
              <a href="#" class="navbar-brand d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="/assets/lightbulb.jpe"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <strong>illuminate</strong>
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(Header));
