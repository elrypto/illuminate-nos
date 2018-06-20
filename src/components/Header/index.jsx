import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";

const { injectNOS, nosProps } = react.default;



const styles = {
};


class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      neoAddress: "...",
      neoLastBalance: 0.0,
      scriptHash: "2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc" //from NeoAuth, in nOS sample app
    }
  }

/*
  componentDidMount(){
    var p = [];
    var p2 = [];
    var val;
    var val2;

    p.push(this.handleGetAddress());
    p2.push(this.handleGetBalance(this.state.scriptHash));

    Promise.all(p).then(result => {
      val = result.toString();
      this.setState({
        neoAddress: val
      })
    });

    Promise.all(p2).then(result => {
      val2 = result;
      this.setState({
        neoLastBalance: val2
      })
    });

    //console.log("neoAddress:" + this.state.neoAddress);
    //console.log("neo Balance:" + this.state.neoLastBalance);
  }


  handleGetAddress = async () => await this.props.nos.getAddress();
  handleGetBalance = async scriptHash => await this.props.nos.getBalance(scriptHash);
*/

  render() {
    const { classes } = this.props;

    // Get Balance
    const neo = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    // const gas = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    // const rpx = "ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9";

    // (test) Invoke
    const scriptHashNeoAuth = "2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc";
    const operation = "9937f74e-1edc-40ae-96ad-1120166eab1b";
    const args = "ef68bcda-2892-491a-a7e6-9c4cb1a11732";

    // Get Storage
    const scriptHashNeoBlog = "85e9cc1f18fcebf9eb8211a128807e38d094542a";
    const key = "post.latest";

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
                  but we use our native utility token ILLI and the NEO token
                  . <a href="#" class="text-white">Why NEO?</a></p>
                </div>
                <div class="col-sm-4 offset-md-1 py-4">
                  <h4 class="text-white">"Me"</h4>
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-white">Profile</a></li>
                    <li><a href="#" class="text-white">Site History</a></li>
                    <li class="text-white">NEO - [this.state.neoLastBalance] ([this.state.neoAddress.substring(0,12) + "..."])</li>
                    <li class="text-white">GAS - [this.state.gasLastBalance]</li>
                    <li class="text-white">Illi - [this.state.illiLastBalance]</li>
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
