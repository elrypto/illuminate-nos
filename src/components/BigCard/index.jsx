import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import StarRatingComponent from 'react-star-rating-component';
import {u, wallet, sc, Neon} from "@cityofzion/neon-js";

const nos = window.NOS.V1;

//import { react } from "@nosplatform/api-functions";

const LESSONS_KEY = "__lesson_key_illi";
const RATINGS_KEY = '__ratings_key_illi';
const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
const styles = {};
const IPFS_BASE_URL = "https://ipfs.infura.io/ipfs/";

/* ILLI contract */
const scriptHash = "702088b5641bbf44c79bcea70659f40ad9a28aa0";


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


/*
* TODO: Manage data for all cards colllectively
* Linearly inefficient with per bigcard retrieves
*/
class BigCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userNeoAddress: "",
      gasBalance: -1,
      purchase_trxn: "",
      purchased: false,
      modalIsOpen: false,
      rating: 0,
      rating_tree: null,
      avg_user_rating: 0
    }

    /* bind methods for React */
    this.handlePurchase = this.handlePurchase.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.doPurchaseTrxn= this.doPurchaseTrxn.bind(this);
    this.ledgerTrxn= this.ledgerTrxn.bind(this);
    this.purchaseCheck = this.purchaseCheck.bind(this);
    this.calculateNewRating = this.calculateNewRating.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.ledgerRating = this.ledgerRating.bind(this);
    this.calculateNewRating = this.calculateNewRating.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.processRetrieve = this.processRetrieve.bind(this);
    this.saveNewTree = this.saveNewTree.bind(this);
    this.addIPFSKeytoBlockchain = this.addIPFSKeytoBlockchain.bind(this);
    this.ratingsCheck = this.ratingsCheck.bind(this);
    this.processStartupRetrieve = this.processStartupRetrieve.bind(this);
    this.processTreeOnStartup = this.processTreeOnStartup.bind(this);
    this.processGetRatingResult = this.processGetRatingResult.bind(this);
    this.unpackByteArrayResult = this.unpackByteArrayResult.bind(this);
    this.updateRatingObj = this.updateRatingObj.bind(this);

    /* check if items are purchased and if there any ratings for this address */
    this.purchaseCheck();
    this.ratingsCheck();
  }

  /*
    will deal with resul of testinvoke, should only be called
    for a single value coming from a key only
  */
  unpackByteArrayResult(data){
    let raw_data = JSON.stringify(data);
    console.log("unpackByteArrayResult() " + raw_data);
    let result = JSON.parse(raw_data);
    //testinvoke will return obj, result, it has an array stack,
    //the first element[0] is assumed our result, so we get the .value attrib
    let key_val = result.stack[0].value;
    var ret_val = null;

    if (key_val){
      ret_val = u.hexstring2str(key_val);
    }
    return ret_val;
  }


  ledgerRating(){
    console.log("ledgerRating() rating of:" + this.state.rating);
    const operation = "Get";
    const args = [RATINGS_KEY];

    //need to get the existing rating tree, to update it
    nos.testInvoke({scriptHash, operation, args})
      .then((data) => this.updateRating(data))
      .catch((err) => alert(`Error: ${err.message}`));
    }


  updateRating(data){
    console.log("returned:" + JSON.stringify(data));
    let result = JSON.parse(JSON.stringify(data));
     //testinvoke will return obj, result, it has an array stack,
     //the first element[0] is assumed our result, so we get the .value attrib
    let key_val = result.stack[0].value;
    console.log("bytearray resturned:" + JSON.stringify(key_val));
    var ipfskey = u.hexstring2str(key_val);

    if (ipfskey != ""){
      console.log("updateRating with key:" + ipfskey);
      //pull rating tree from ipfs
      var ipfs = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'});
      ipfs.files.get(ipfskey, this.processRetrieve);
    }else {
      //skip the ipfs step, which should only happen when there are 0 ratings

      let newJsonTree = []
      this.calculateNewRating(newJsonTree);
    }
  }


  processRetrieve(err, files) {
    files.forEach((file) => {
      let result = file.content.toString('utf8');
      //console.log(JSON.stringify(result));
      let returnedJSON = JSON.parse(result);
      //console.log("PARSED JSON=");
    //  console.log(JSON.stringify(returnedJSON));
      this.state.rating_tree = returnedJSON;

      this.calculateNewRating(returnedJSON);
      })
  }

  calculateNewRating(jsonTree){
    console.log("calculateNewRating()")
    console.log(JSON.stringify(jsonTree));


    let found = false;

    jsonTree.forEach((rating_obj) => {
      console.log("rating_obj.neo_addr:" + rating_obj.neo_addr);
        if (new String(this.props.neo_addr).valueOf()===new String(rating_obj.neo_addr).valueOf()){
          found = true;
          console.log("matched rating objects for this address:" + this.props.neo_addr);

          rating_obj = this.updateRatingObj(rating_obj);

          let this_rating = this.state.rating;
          let current_avg_rating = rating_obj.avg_rating;
          let num_ratings = rating_obj.raw_ratings.length;
          let  new_avg = ((current_avg_rating * num_ratings) +
                    this_rating) / (num_ratings + 1)

          rating_obj.avg_rating = new_avg;

          console.log("current_avg_rating:" + current_avg_rating);
          console.log("num_ratings:" + num_ratings);
          console.log("new avg:" + new_avg);
        }
    })

    if (found===false){
      console.log("that user was not found in tree, create new rating obj");
      let rating_obj = [];
      rating_obj = this.updateRatingObj(rating_obj);
      rating_obj.avg_rating = this.state.rating;
      jsonTree.push(rating_obj);
    }

    this.saveNewTree(jsonTree);
  }

  updateRatingObj(rating_obj){
    let raw_rating = {
      user_neo_addr: this.props.user_neo_addr,
      rating: this.state.rating,
      notes: "",
      timestamp: ""
    }


    if (rating_obj.raw_ratings==null){
      let empty_raws = []
      rating_obj.raw_ratings = empty_raws;
    }

    rating_obj.raw_ratings.push(raw_rating);
    return rating_obj;
  }



  saveNewTree(jsonRatingTree){
    console.log("saving updated json to ipfs" + JSON.stringify(jsonRatingTree));

    var ifpsBuffer = Buffer.from(JSON.stringify(jsonRatingTree));
    var ipfs = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'});

    ipfs.add([ifpsBuffer], {pin:false})
            .then(response => {
                this.addIPFSKeytoBlockchain(response[0].hash);
            }).catch((err) => {
                alert(err);
            });
  }

  /* save ipfs key to block */
  addIPFSKeytoBlockchain(hash){
    console.log("adding ipfs hash to blockchain:" + JSON.stringify(hash));

    const operation = "Save";
    const args = [RATINGS_KEY, hash];
    nos.invoke({scriptHash, operation, args})
        .then((txid) => alert(`Rating saved to blockchain txid: ${txid} `))
        .catch((err) => alert(`Error: ${err.message}`));
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


  ratingsCheck(){
    console.log("calling testinvoke() to get ratings");
    const operation = "Get";
    const args = [RATINGS_KEY];
    nos.testInvoke({scriptHash, operation, args})
        .then((data) => this.processGetRatingResult(data))
        .catch((err) => alert(`Error: ${err.message}`));
  }


  processGetRatingResult(data){
    console.log("processGetRatingResult() - component startup check for ratings")
    console.log("blockchain key data: " + JSON.stringify(data));

    let key = this.unpackByteArrayResult(data);
    console.log("unpacked ipfs key:" + key);
    let attemptRatingRetrieve = false;

    if (key != null && key != ""){
      attemptRatingRetrieve = true;
    }

    if (attemptRatingRetrieve === true){
      //get ratings from IpfsApi
      var ipfs = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'});
      ipfs.files.get(key, this.processStartupRetrieve);
    }
  }


  processStartupRetrieve(err, files){
    files.forEach((file) => {
      let result = file.content.toString('utf8');
      let returnedJSON = JSON.parse(result);
      this.state.rating_tree = returnedJSON;
      this.processTreeOnStartup(returnedJSON);
    })
  }


  processTreeOnStartup(jsonTree){
    console.log("processTreeOnStartup()")
    console.log(JSON.stringify(jsonTree));

    jsonTree.forEach((rating_obj) => {
      console.log("rating_obj.neo_addr:" + rating_obj.neo_addr);
        if (new String(this.props.neo_addr).valueOf()===new String(rating_obj.neo_addr).valueOf()){
          console.log("matched rating objects for this address:" + this.props.neo_addr);
          this.state.avg_user_rating = rating_obj.avg_rating;
          console.log("avg rating set to:" + this.state.avg_user_rating);
        }
    })
  }


  componentDidMount(){}


  /*  TODO: Refactor
   *  1. store (shared state like lessons, and address in react store
   *  2. way more MODULAR,... method chains should have pure methods with returns
   *  3. use setState{}
   *
   *  Ledger Trx + IPFS for ratings both have same form - ipfs + blockchain
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

  console.log("avg user rating:" + this.state.avg_user_rating);

  return(
  <React.Fragment>

            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={IPFS_BASE_URL + this.props.image_url} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text-service-name">{this.props.service_name}</p>
                  <p class="card-text-descr">{this.props.description}</p>
                  <StarRatingComponent
                     name="rate2"
                     starCount={5}
                     editing={false}
                     value={this.state.avg_user_rating}
                   />
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
