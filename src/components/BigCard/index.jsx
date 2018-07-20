import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
const nos = window.NOS.V1;


const styles = {
};

const funcDelay = 200;
const trxDelay = 2500;
const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';


class BigCard extends React.Component {

  constructor(props) {
    super(props);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.doPurchaseTrxn= this.doPurchaseTrxn.bind(this);
    this.ledgerTrxn= this.ledgerTrxn.bind(this);


    this.state = {
      userNeoAddress: "",
      gasBalance: -1,
      purchase_trxn: ""
    }
  }


  componentDidMount(){

  }


  /*  TODO: Refactor
   *  1. store (shared state like lessons, and address in react store)
   *  2. NeoTransactionChain - component that will pump output
   *  of last call into next call and wait for a delay between calls
   *  and retry on "no next state"
   *
   */

  // *** 4/4
  ledgerTrxn(trxId){
    alert(`${this.props.price_per_15} GAS sent in transaction ${trxId}.
      The lesson has been purchased. It may take up to an hour for the
      lesson to be available. When it is ready you will see a start button.`);

    console.log("ledgerTrxn()  for addr=" + this.props.neo_addr);
    /** TODO: Should be writing to the blockchain, using local for now
     */

     /** TODO: use setState() **/
     this.state.purchase_trxn = trxId;

    let lessons = [];
    //get lessons
    //lessons = JSON.parse(localStorage.getItem(('lessons')))

    let lesson = {
      user_addr: this.state.userNeoAddress,
      provider_addr: this.props.neo_addr,
      blockchain_trxn: this.state.purchase_trxn,
      time_stamp: Date.now()
    }

    lessons.push(JSON.stringify(lesson));
    console.log("writing lessons to local user addr" + lesson.user_addr);
    console.log("writing lessons to local provider addr" + lesson.provider_addr);
    console.log("writing lessons to trxn" + lesson.blockchain_trxn);
    console.log("writing lessons to time stamp" + lesson.time_stamp);
    localStorage.setItem('lessons',JSON.stringify(lessons));
  }


  // *** 3/4
  doPurchaseTrxn(balance){
    this.state.gasBalance = balance;

    console.log("doPurchaseTrxn()  neoGas balance=" + this.state.gasBalance);
    console.log("lesson provider addr:" + this.props.neo_addr);
    console.log("cost of of this lesson:" + this.props.price_per_15);

    console.log("neoGas:" + this.state.gasBalance + " price:"+ this.props.price_per_15);


    if (this.state.gasBalance >= this.props.price_per_15){
        console.log("sufficient funds");
        const amount = this.props.price_per_15;
        const receiver = this.props.neo_addr;

        nos.send({ asset: GAS, amount, receiver})
            .then((txid) => this.ledgerTrxn(txid))
            .catch((err) => alert(`Error: ${err.message}`));

    }else{
      /**TODO: switch to a notify message style
      */
      alert("Insufficient neoGas token balance to purchase this lesson");
    }
  }

  // *** 2/4
  getBalance(address){
    /** TODO: use setstate **/
    this.state.userNeoAddress = address;
    console.log("getBalance() address set:" + this.state.userNeoAddress);

    nos.getBalance({asset:GAS})
      .then((balance) => this.doPurchaseTrxn(balance))
      .catch((err) => alert(`Error: ${err.message}`));

  }

  // *** 1/4
  handlePurchase(event) {
    console.log("handlePurchase()");

    nos.getAddress()
      .then((address) => this.getBalance(address))
      .catch((err) => alert(`Error: ${err.message}`));
  }



render() {

  return(
  <React.Fragment>

            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={new String(this.props.image_url)} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text">{this.props.service_name}</p>
                  <p class="card-text">{this.props.description}</p>
                  <p class="card-text">{this.props.rating}</p>
                  <p class="card-text">#{this.props.tags}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary" onClick={this.handlePurchase.bind(this)}>Purchase Lesson</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
                    </div>
                    <small class="text-muted">{this.props.price_per_15} GAS</small>
                  </div>
                </div>
              </div>
            </div>

  </React.Fragment>
);
 }
}

BigCard.propTypes = {
};

export default injectSheet(styles)(BigCard);
