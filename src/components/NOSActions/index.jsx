import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";

const { injectNOS, nosProps } = react.default;


const r2 = "Aaq1KrK33JmxyxH2arhkQKCh5ADbhCC2vJ";

const styles = {
  button: {
    margin: "16px",
    fontSize: "14px"
  }
};

class NOSActions extends React.Component {


  handleAlert = async func => alert(await func);

  // handleGetAddress = async () => alert(await this.props.nos.getAddress());

  handleClaimGas = () =>
    this.props.nos
      .claimGas()
      .then(alert)
      .catch(alert);


      handleInvoke = async (scriptHash, operation, args) =>
          await this.props.nos.invoke(scriptHash, operation, args);

      handleTestInvoke = async (scriptHash, operation, args) =>
            await this.props.nos.testInvoke(scriptHash, operation, args);


  doTestInvoke = () => {
    var promise = [];
    var temp;
    promise.push(this.handleTestInvoke());
    Promise.all(promise).then(result => {
      temp = result.toString();
      console.log("invoke res:" + temp);
    });
  }

  /* TODO: need to fix, move to normal usage into the rest of code
   *  This is a workaround for a undefined issue for the const if used in a normal
   *  way from render
   *
  */
  doSendGas(amount, receiver){
    console.log("doSendGas()");
    const nos = window.NOS.V1;

    const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
  //  const amount = '5';
  //  const receiver = 'Aaq1KrK33JmxyxH2arhkQKCh5ADbhCC2vJ';


    nos.send({ asset: GAS, amount, receiver })
      .then((txid) => alert(`${amount} GAS sent in transaction ${txid}`))
      .catch((err) => alert(`Error: ${err.message}`));
  }


  doGetStorage(){
    const nos = window.NOS.V1;

    const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
    const key = 'post.latest';

    // If you want to handle encoding / decoding yourself, use:
    // nos.getStorage({ scriptHash, key, encodeInput: false, decodeOutput: false })
    nos.getStorage({ scriptHash, key })
        .then((data) => alert(`Get storage data: ${data} `))
        .catch((err) => alert(`Error: ${err.message}`));
  }


  render() {

const { classes, nos } = this.props;

    const neo = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    const gas = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    const rpx = "ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9";


    // Add your smart contract's scriptHash here
    const scriptHash = "6d58a68df059924dd5ba40193b9b16a8094188e3";

    // The operation of your smart contract you want to (test)invoke
    const operation = "";

    // The storagekey you want to query
    const key = "AbjM4eCVoTvy6UPPe4PgDdgz9LfsyUQXqn";

    // The necessary arguments for you (test)invoke
    const args = ["add", key ,3];

    // The amount and recipient of your send function
    const reciever = "Aaq1KrK33JmxyxH2arhkQKCh5ADbhCC2vJ";
    const amount = "1";

    const invoke = { scriptHash, operation, args }; // and testInvoke
    const getStorage = { scriptHash, key };
    const send = { amount, asset: gas, reciever };


    return (
      <React.Fragment>
        <button className={classes.button} onClick={() => this.handleAlert(nos.getAddress())}>
          Get Address
        </button>
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getBalance({ asset: neo }))}
        >
          Get NEO Balance
        </button>
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getBalance({ asset: gas }))}
        >
          Get GAS Balance
        </button>
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getBalance({ asset: rpx }))}
        >
          Get RPX Balance
        </button>

        <button className={classes.button} onClick={this.handleClaimGas}>
          Claim Gas
        </button>
        <button className={classes.button} onClick={() => this.handleAlert(nos.send(send))}>
          Send GAS to...
        </button>

        <button className={classes.button} onClick={() => this.doSendGas("7", "Aaq1KrK33JmxyxH2arhkQKCh5ADbhCC2vJ")}>
        SEND GAS 2
        </button>


        <button className={classes.button} onClick={() => this.doGetStorage()}>
        GET STORAGE 2
        </button>


        <button className={classes.button} onClick={() => console.log(r2)}>
        r2
        </button>

        <button className={classes.button} onClick={this.doTestInvoke}>
          TestInvoke
        </button>
        {/*
          <button
            className={classes.button}
            onClick={() => this.handleAlert(nos.invoke(invoke))}
          >
            Invoke
          </button>
        */}
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getStorage(getStorage))}
        >
          GetStorage
        </button>

        <button
          className={classes.button}
          onClick={() => this.handleAlert(localStorage.setItem("items",JSON.stringify("aaa")))}
        >
          Local Storage PUT
        </button>

        <button
          className={classes.button}
          onClick={() => this.handleAlert(JSON.parse(localStorage.getItem("items")))}
        >
          Local Storage GET
        </button>

      </React.Fragment>
    );
  }
}

NOSActions.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(NOSActions));
