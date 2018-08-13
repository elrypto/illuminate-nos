import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import StarRatingComponent from 'react-star-rating-component';
const nos = window.NOS.V1;

//import { react } from "@nosplatform/api-functions";

const LESSONS_KEY = "__lesson_key_illi";
const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
const styles = {};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


Modal.setAppElement('#root');

class BigCard extends React.Component {


  constructor(props) {
    super(props);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.doPurchaseTrxn= this.doPurchaseTrxn.bind(this);
    this.ledgerTrxn= this.ledgerTrxn.bind(this);
    this.purchaseCheck = this.purchaseCheck.bind(this);

    this.state = {
      userNeoAddress: "",
      gasBalance: -1,
      purchase_trxn: "",
      purchased: false,
      modalIsOpen: false,
      rating: 0
    }
    /* bind methods */
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.ledgerRating = this.ledgerRating.bind(this);

    /* check if items are purchased */
    this.purchaseCheck();
  }


  ledgerRating(){
    console.log("ledgerRating() rating of:" + this.state.rating);
  }


  onStarClick(nextValue, prevValue, name) {
      console.log("rating click() set to:" + nextValue);
      this.setState({rating: nextValue});
    }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  purchaseCheck(){
    let lessons = []
    let storedLessons = JSON.parse(localStorage.getItem("illi-lessons"));

    if (storedLessons != null){
      lessons = storedLessons;
    }

    let l = null;
//    console.log ("lessons purchased by all providers:" + lessons.length);
//    console.log("lessons:" + JSON.stringify(lessons));
    for (l in lessons){

        /* check for a lesson purchased*/
        if (new String(this.props.neo_addr).valueOf()===new String(lessons[l].provider_addr).valueOf()){
            /* make sure its not been used */
            //console.log("matched neo addr, state:" + lessons[l].state);
            if (lessons[l].state==="0"){
              this.state.purchased = true;
            }
        }
    }

  }

  componentDidMount(){}


  /*  TODO: Refactor
   *  1. store (shared state like lessons, and address in react store
   *
   */

  // *** 4/4
  ledgerTrxn(trxId){
    trxId = "dkjjew9r033u2j2jlwjreTEST";

    alert(`${this.props.price_per_15} GAS sent in transaction ${trxId}.
      The lesson has been purchased. It may take up to an hour for the
      lesson to be available. When it is ready you will see a start button.`);

    console.log("ledgerTrxn()  for addr=" + this.props.neo_addr);
    /** TODO: Should be writing to the blockchain, using local for now
     */

     /** TODO: use setState() **/
     this.state.purchase_trxn = trxId;

     let lessons = []
     let storedLessons = JSON.parse(localStorage.getItem("illi-lessons"));

     if (storedLessons != null){
       lessons = storedLessons;
     }

      let lesson = {
        user_addr: this.state.userNeoAddress,
        provider_addr: this.props.neo_addr,
        blockchain_trxn: this.state.purchase_trxn,
        time_stamp: Date.now(),
        state: "0"
      }

    lessons.push(lesson);
//    console.log("writing lesson to local user addr:" + lesson.user_addr);
//    console.log("writing lesson to local provider addr:" + lesson.provider_addr);
//    console.log("writing lesson to trxn:" + lesson.blockchain_trxn);
//    console.log("writing lesson to time stamp:" + lesson.time_stamp);
    localStorage.setItem("illi-lessons",JSON.stringify(lessons));
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

  const { rating } = this.state;

  let startButton = "";
  console.log("purchased:" + this.state.purchased)
  if (this.state.purchased===true){
    startButton = <button id="startButton" onClick={this.openModal} type="button" class="btn btn-sm btn-outline-secondary">Start</button>
  }

  return(
  <React.Fragment>

            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={new String(this.props.image_url)} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text-service-name">{this.props.service_name}</p>
                  <p class="card-text-descr">{this.props.description}</p>
                  <p class="card-text-small">{this.props.rating}</p>
                  <p class="card-text-small">#{this.props.tags}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button id="purchaseButton" disabled={this.state.purchased} type="button" class="btn btn-sm btn-outline-secondary" onClick={this.handlePurchase.bind(this)}>Purchase Lesson</button>
                      {startButton}
                    </div>
                    <small class="text-muted">{this.props.price_per_15} GAS</small>
                  </div>
                </div>
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="illuminate - live video lesson"
              >
              <div class="card mb-4 box-shadow">
                  <div>
                    <button class="btn btn-sm btn-outline-secondary" onClick={this.closeModal}>close</button>
                    <button class="btn btn-sm btn-outline-secondary" onClick="">share screen</button>
                  </div>
                  <h2 ref={subtitle => this.subtitle = subtitle}>coming soon (with nOS media support)</h2>
                  <img class="card-img-top" src={require('/assets/video_screenshot.JPG')} />
                <div class="card-body">
                  <input id="inbx" class="card-input" size="50" type="text"/>
                  <button class="btn btn-sm btn-outline-secondary" onClick="">send message</button>
                  <br/>
                  <textarea rows="6" cols="80">Chef Elaine: What do you want to cook together today?</textarea>
                </div>
                 <div >
                   <p>Rate your lesson:</p>
                   <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick.bind(this)}
                    />
                    <button class="btn btn-sm btn-outline-secondary" onClick={this.ledgerRating}>save rating</button>
                 </div>
              </div>
              </Modal>
            </div>

  </React.Fragment>
  );}
}

BigCard.propTypes = {
};

export default injectSheet(styles)(BigCard);
