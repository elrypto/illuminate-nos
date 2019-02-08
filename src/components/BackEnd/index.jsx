import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { DEFAULT_APP_STATE_TREE } from '../../reducers';
import { retrieveKeyFromBlock, getAppState, setAppStateTree,
  retrieveNeoAddr, addProvider, startInProgress, endInProgress,
  infoMessage, warningMessage, errorMessage, makePurchase,
  addRatingToState, fetchRatingsForProviders, ratingForAddr, fetchPurchases
  } from '../../actions';
import { injectNOS, injectAssets, nosProps, assetProps } from "@nosplatform/api-functions/lib/react";
import LittleCard from '../LittleCard';
import PurchaseTable from '../PurchaseTable';
import Neon from "@cityofzion/neon-js";
import { rpc, api, setting } from "@cityofzion/neon-js";




const SAMPLE_PROVIDER_STATE = {
  neo_addr: 'A3n2E1O4A7d4d2R5',
  service_name: 'myService',
  name: 'myName',
  service_description: 'What my service does',
  email: 'me@gmail.com',
  category: 'Programming',
  delivery_options: {
      eMail: true,
      Text: true,
      Video: false
    },
  service_keywords:'service programming',
  price: 3,
  ipfs_image_hash: "I1h2a3s4h5v6a7l8u9e0",
  is_provider: true
}


class BackEnd extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display: '',
      ratingVal: '',
      ratingAddr: '',
      purchaseTo: '',
      purchaseFrom: ''
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
    this.addDefaultProvider = this.addDefaultProvider.bind(this);
    this.d = this.d.bind(this);
  }


  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getAppState());
    dispatch(retrieveNeoAddr());
    dispatch(fetchRatingsForProviders());
    dispatch(fetchPurchases());
    //TEMP
    dispatch(endInProgress());
  }

  handleMakePurchaseNeon = e => {

    const config = {
      name: "PrivateNet",
      extra: {
        neoscan: "http://cd-nos-host:4000/api/main_net"
      }
    };

      const privateNet = new rpc.Network(config);
      Neon.add.network(privateNet);

      console.log("privatenet=" + JSON.stringify(privateNet));

      // You will be able to lookup an instance of PrivateNet neoscan
      var privateNetNeoscan = new Neon.api.neoscan.instance("PrivateNet");
      const address = "AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y";
      privateNetNeoscan.getBalance(address).then(res => console.log(res));

  }


  
  filterBasedOnTo = e => {
    console.log("attempting to filter on TO addr:"+ this.state.purchaseTo);
    let filterOptions = {'toAddr': this.state.purchaseTo};
    this.props.dispatch(fetchPurchases(filterOptions));
  }

  filterBasedOnFrom = e => {
    console.log("attempting to filter on From addr:"+ this.state.purchaseFrom);
    let filterOptions = {'fromAddr': this.state.purchaseFrom};
    this.props.dispatch(fetchPurchases(filterOptions));
  }

  filterBasedOnToandFrom = e => {
    console.log("attempting to filter on To and From");
    let filterOptions = {'toAddr': this.state.purchaseTo,
                          'fromAddr': this.state.purchaseFrom};
    this.props.dispatch(fetchPurchases(filterOptions));
  }
  



  handleMakePurchase = e => {
    console.log("handleMakePurchase()");
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(makePurchase('ATBFYDdfU3CiYZyu679PaPv388tXVT38WcM', '5'));
  }

  handleGetRatings = e => {
    console.log("handleGetRatings()");
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(fetchRatingsForProviders());
  }

  handleRatingChange = e => {
    this.setState({ratingVal:e.target.value});
  }

  handlePurchaseToChange = e => {
    this.setState({purchaseTo:e.target.value});
  }

  handlePurchaseFromChange = e => {
    this.setState({purchaseFrom:e.target.value});
  }

  handleRatingAddrChange = e => {
    this.setState({ratingAddr: e.target.value})
  }

  handleAddRating = e => {
    console.log("handleAddRating()");
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(addRatingToState(this.state.ratingAddr,
                                    'i like this guy', this.state.ratingVal));
  }

  handleTestNotification = e => {
    console.log("testNotification()");
    e.preventDefault();
    const {dispatch} = this.props;

    dispatch(errorMessage("this is a test message "));
  }

  handleShow = e => {
    e.preventDefault();
    const {dispatch} = this.props;
    this.d('handleShow()');
    dispatch(getAppState());
  }

  handleLoading = e => {
    e.preventDefault();
    this.d('handleLoading()');
    this.props.dispatch(startInProgress());
    setTimeout(() => {this.props.dispatch(endInProgress());}, 2000)

  }

  handleGetKeyFromBlock = e => {
    e.preventDefault();
    const {dispatch} = this.props;
    this.d("handleGetKeyFromBlock()");
    this.d("getting retval for Action.retrieveKeyFromBlock()")
    dispatch(retrieveKeyFromBlock());
    this.display = this.props.appStateKey
  }

  handleResetState = e => {
    e.preventDefault();
    const {dispatch} = this.props;
    this.d("handleResetState()");
    this.d("attempting to reset state with...");
    console.log(JSON.stringify(DEFAULT_APP_STATE_TREE));
    dispatch(setAppStateTree(DEFAULT_APP_STATE_TREE));
  }

  handleClear = e => {
    e.preventDefault();
    this.setState({display:''})
  }

  handleTestNotificationNoRedir = e => {
    e.preventDefault();
    console.log("handleTestNotificationNoRedir()");
  }


  handleTestInvoke(){
  /*  const nos = window.NOS.V1;
    const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
    const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
    const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732'];

      // If you handle encoding yourself, use:
      // nos.invoke({ scriptHash, operation, args, encodeArgs: false })
      nos.invoke({ scriptHash, operation, args })
          .then((txid) => alert(`Invoke txid: ${txid} `))
          .catch((err) => alert(`Error: ${err.message}`));

      // Example with assets attached
      const { NEO, GAS } = window.NOS.ASSETS;

      const assets = {
        [NEO]: '1',
        [GAS]: '3.04950068'
      };

      nos.invoke({ scriptHash, operation, args, assets })
          .then((txid) => alert(`Invoke txid: ${txid} `))
          .catch((err) => alert(`Error: ${err.message}`));
    */
  }


  addDefaultProvider = e => {
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(addProvider(SAMPLE_PROVIDER_STATE));
  }

 

  d(content, append=true){
    console.log(content);
    /*if (append===true){
        let temp = content;
        content = this.state.display;
        if (content!==""){
          content = content + "\n"+ temp;
        }else{
            content = temp;
        }
    }*/
    let new_content = this.state.display + "\n" + content;
    //console.log("display:" + this.state.display);
  //  console.log("content:" + content);
  //  console.log("new content:" + new_content, append);
    this.setState({display:new_content});
  }





  render() {

    const {appStateTree, users, appStateKey, providerAvgRatings, purchases} = this.props;

    //console.log(`ratings: ${JSON.stringify(providerAvgRatings)}`);

    return (
      <React.Fragment>

      <br/><hr/><br/>

      <button class="btn" onClick={this.handleShow}>
        Show App State</button>
      <button class="btn btn-secondary" onClick={this.addDefaultProvider}>
            Add Default Provider</button>

        <br/><hr/><br/>

        <button class="btn" onClick={this.handleClear}>
          Clear Display</button>
        <button class="btn btn-secondary" onClick={this.handleGetKeyFromBlock}>
            Get IPFS Key from Block</button>

        <a href="#/provider/new" class="btn btn-secondary  my-2">Go to Add Provider Page</a>

        <button class="btn" onClick={this.handleTestNotification}>
            Test Notification Sample</button>
        <button class="btn" onClick={this.handleLoading}>
              Test inProgress Loading</button>
        <button class="btn" onClick={this.handleTestNotificationNoRedir}>
                    NoRedir Notification</button>


              {
                        /*
                          Purchase
                          - send
                          - add to purchases
                          - ? send to remote? (purchase state?)

                          Rating
                          - get current ratings
                          - for the provider, by this user, calculate rating
                          - add raw rating to raw ratings[]

                        */
                }
        <button class="btn" onClick={this.handleMakePurchase}>
            Make Purchase</button>

            <br/>


        <label for="ratingAddr">Provider Addr</label>
        <input id="ratingAddr" type="text" value={this.state.ratingAddr} onChange={this.handleRatingAddrChange}/>
        <label for="ratingAddr">Rating</label>
        <input id="ratingVal" type="text" value={this.state.ratingVal} onChange={this.handleRatingChange}/>
        <button class="btn" onClick={this.handleAddRating}>
                  Add Rating</button>


        <button class="btn" onClick={this.handleGetRatings}>
                    Get Provider Ratings</button>

        <br/>
        <hr/>

        <button class="btn  btn-primary" onClick={this.handleResetState}>
          DANGER --- Reset App State</button>

            <br/><hr/><br/>

            <p>USERS</p>

            {/* users.map(function(card, i){
                return <LittleCard
                  key={i.toString()}
                  neo_addr={card.neo_addr}
                  name={card.name}
                  service_name={card.service_name}
                  description={card.service_description}
                  rating={card.rating}
                  profile_link_out={card.profile_link_out}
                  tags={card.service_keywords}
                  preferred_method={card.preferred_method}
                  image_url={card.ipfs_image_hash}
                  price_per_15={card.price}
                  std_lesson_duration={card.std_lesson_duration}
                  online_now={false}
                  deleteable={true}
                  avg_rating={ratingForAddr(providerAvgRatings, card.neo_addr)}
                />;
             })*/}

             <LittleCard users={users} />

            

        <br/><hr/><br/>
        <div>
          <p>PURCHASES</p>

          <label for="purchaseTo">To</label>
          <input id="purchaseTo" type="text" value={this.state.purchaseTo} onChange={this.handlePurchaseToChange}/>

          <label for="purchaseFrom">From</label>
          <input id="purchaseFrom" type="text" value={this.state.purchaseFrom} onChange={this.handlePurchaseFromChange}/>

          <button class="btn" onClick={this.filterBasedOnTo}>
            Purchase Filter (To)</button>

          <button class="btn" onClick={this.filterBasedOnFrom}>
            Purchase Filter (From)</button>

          <button class="btn" onClick={this.filterBasedOnToandFrom}>
            Purchase Filter (To+From)</button>
        
          <PurchaseTable purchases={purchases} />


        </div>

          <br/><hr/><br/>

          <textarea
            id="display"
            rows="15"
            cols="100"
            value={this.state.display} />

            <label for="state_display">this.state</label>
            <textarea
              id="state_display"
              rows="15"
              cols="100"
              value={JSON.stringify(this.state)} />


              <label for="props_display">this.props</label>
              <textarea
                id="props_display"
                rows="15"
                cols="100"
                value={JSON.stringify(this.props)} />

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {

  const {appStateTree, appStateKey, providerAvgRatings, purchases} = state;
  const users = appStateTree.users;

  return {
    appStateTree, users, appStateKey, providerAvgRatings, purchases
  }
}

export default connect(mapStateToProps)(BackEnd)
