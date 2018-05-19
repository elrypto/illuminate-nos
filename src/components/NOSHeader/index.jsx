import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { nosPropTypes } from "@nosplatform/api-functions/es6";

import { injectNOS } from "../../nos";

const styles = {
};

class NOSHeader extends React.Component {
/*
  handleGetBalance = async scriptHash => await this.props.nos.getBalance(scriptHash);

  handleGetAddress = async () => alert(await this.props.nos.getAddress());

  handleClaimGas = () =>
    this.props.nos
      .claimGas()
      .then(alert)
      .catch(alert);

  handleGetBalance = async scriptHash => alert(await this.props.nos.getBalance(scriptHash));

  handleTestInvoke = async (scriptHash, operation, args) =>
    alert(await this.props.nos.testInvoke(scriptHash, operation, args));

  handleInvoke = async (scriptHash, operation, args) =>
    alert(await this.props.nos.testInvoke(scriptHash, operation, args));

  handleGetStorage = async (scriptHash, key) =>
    alert(await this.props.nos.getStorage(scriptHash, key));*/

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
        <ul class="list-unstyled">
          <li><a href="#" class="text-white">Profile</a></li>
          <li><a href="#" class="text-white">Site History</a></li>
          <li class="text-white"><a href="#" class="text-white">Neo</a> - - </li>
          <li class="text-white"><a href="#" class="text-white">Illi</a> - [Balance]</li>
        </ul>
      </React.Fragment>
    );
  }
}

NOSHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosPropTypes.isRequired
};

export default injectNOS(injectSheet(styles)(NOSHeader));
