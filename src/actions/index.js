import React from "react";
import {u, wallet, sc, Neon} from "@cityofzion/neon-js";
import $ from 'jquery';

//import nos from "@nosplatform/api-functions/lib";
const ASSETS = window.NOS.ASSETS;
const nos = window.NOS.V1;
const NEO = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
const GAS = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
const RPX = "ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9";

export const IPFS_BASE_URL = "https://ipfs.infura.io/ipfs/";
const ILLI_SERVER_URL = "https://illuminate-web-1.herokuapp.com";

/* ILLI contract */
const scriptHash = "702088b5641bbf44c79bcea70659f40ad9a28aa0";
//const scriptHash = "00bd403167c11d752a0c70b24692f237ba072fbe";
//const scriptHash = "0777595f5123ec0686f556984be08c48de87ea14";

export const SET_APP_STATE_TREE = 'SET_APP_STATE_TREE';
export const RECEIVE_APP_STATE = 'RECEIVE_APP_STATE';
export const RECEIVE_APP_STATE_KEY = 'RECEIVE_APP_STATE__KEY';
export const RETRIEVE_KEY = 'RETRIEVE_KEY';
export const APP_STATE_KEY = '__state_key_illi';

export const RECEIVE_NEO_ADDR = "RECEIVE_NEO_ADDR";
export const RECEIVE_ONLINE = "RECEIVE_ONLINE";
export const RECEIVE_RATINGS = "RECEIVE_RATINGS";
export const RECEIVE_PROVIDER_AVG_RATINGS = "RECEIVE_PROVIDER_AVG_RATINGS";
export const RECEIVE_PURCHASES = "RECEIVE_PURCHASES";

export const START_IN_PROGRESS = "START_IN_PROGRESS";
export const END_IN_PROGRESS = "END_IN_PROGRESS";


import Notifications, {success, warning, error} from 'react-notification-system-redux';

const ADMIN_ADDRESSES = ['ATBFYDdfU3CiYZyu679PaPv388tXVT38WcM', 'AbaUwnC1ADuYadtDB2BRUACVr65FV8vDAH']



const styles = {};

const notificationOptsSuccess = {
  // uid:
  title: 'Success',
  position: 'tc',
  autoDismiss: 0,
  action: {
    label: 'Go to Homepage',
    callback: () => window.location = '/'
  }
};

const notificationOptsInfo = {
  // uid:
  title: 'Info',
  position: 'tc',
  autoDismiss: 4,
};

const notificationOptsWarning = {
  title: 'Warning',
  position: 'tc',
  autoDismiss: 4,
};

const notificationOptsError = {
  title: 'Error',
  position: 'tc',
  autoDismiss: 0,
};

/*
  add Provider
    - inProgress = true
    - haveEntities? yes, stillFresh
    - addProvider to Providers
    - write to Block
    - return new Entites
    - return status code

  retrieveProviders
  -haveEntities? no
  - retrieveEntities
  -haveEntities? yes
  - stillFresh? (has there been a write?)
  - retrieve providers
  - getRatings for providers
  - stillFresh?
  -- for each provider, get ratings

*/

/*
  -session
  --menu_selected
  --recent
  --purchased (involving me)
  ---trx.id


  -entities
  --USER/PROVIDER
  ---name [unique] [max length=30]
  ---is_provider
  ---avg_rating
  ---num_of_ratings
  ---neo_addr [unique]

  --(if is_provider==true  PROVIDER DETAILS)
  ---service_name [unique] [max length=30]
  ---description [max length=100]
  ---profile_link_out [unique]
  ---email
  ---service_keywords
  ---ipfs_image_hash
  ---price_per
  ---num_of_lessons_delivered
  ---categorey_ids[]
  ---delivery_option[]
  ---price

  --RATINGS
  ---rating
  ---notes
  ---date
  ---user.id

  --CATEGORIES
  ---name
  ---description
  --TRXN
  ---id
  ---user
  ---provider
*/

/* Messages, warnings and errors for users
*/
export const infoMessage = (message, isSuccess) => dispatch => {
  let messageOptions = null;
  if (isSuccess){
    messageOptions = notificationOptsInfo;
  }else {
    messageOptions = notificationOptsSuccess;
  }
  messageOptions.message = message;
  dispatch(success(messageOptions));
  dispatch(endInProgress());
}

export const warningMessage = message => dispatch => {
  let messageOptions = notificationOptsWarning;
  messageOptions.message = message;
  dispatch(warning(messageOptions));
  dispatch(endInProgress());
}

export const errorMessage = message => dispatch => {
  let messageOptions = notificationOptsError;
  messageOptions.message = message;
  dispatch(error(messageOptions));
  dispatch(endInProgress());
}

/* NO DISPATCH ~~~~~~~~~~~~~~~~~~~
*/

export const ratingForAddr = (ratingsArray, thisAddr) => {
 // console.log(`this addrs=${thisAddr}, ratingArray:${JSON.stringify(ratingsArray)}`);
  for (var i=0; i < ratingsArray.length; i++){
    //expecting array of arrays
    //console.log(`(iteration ${i}) testing [${ratingsArray[i][0]}]==[${thisAddr}]`)
    if ((ratingsArray[i][0]).trim()==thisAddr.trim()){
      //console.log(`matched (iteration ${i}) on ${ratingsArray[i][0]} so returning ${ratingsArray[i][1]}`)
      return ratingsArray[i][1];
    }
  }
}


/*
  Check list of addresses to see if address is in admin list
*/
export const authorizedToView = neoAddr => {
  let match = false;
  for (var i = 0; i < ADMIN_ADDRESSES.length; i++) {
    if (ADMIN_ADDRESSES[i]===neoAddr){
      match = true;
    }
  }
  if (match===false){
    window.location = '/';
  }
}

/* trims, or pads to length */
export const trimStr = (str, len) => {
  if (str.length <= len){
    return str.padEnd((len-str.length0), ' ');
  }
  return (str.substr(0, len-1)) + "...";

  /*if (this.length <= n) { return this; }
  var subString = this.substr(0, n-1);
  return (useWordBoundary
     ? subString.substr(0, subString.lastIndexOf(' '))
     : subString) + "&hellip;";
};*/
}

/* ~~~~~~~~~~~~~~~~~ END NO DISPATCH
*/

/* 
   Will fetch all purcahses
   optionally can set either or both of
   {
     'toAddr:[NEO ADDRESS]'
     'fromAddr:[NEO ADDRESS]'
   }
*/
export const fetchPurchases = (options) => { 

  let filterOptions = options;

    return (dispatch, getState) => {
      //console.log(`filterOptions1---${JSON.stringify(filterOptions)}`);
      let rawPurchases =  getState().appStateTree.purchases;
      let toReturn = []; 

      if (filterOptions){
        ///console.log(`filterOptions2---${JSON.stringify(filterOptions)}`);
        let fTo = filterOptions.toAddr;
        let fFr = filterOptions.fromAddr;

        for (var i=0; i<rawPurchases.length; i++){
          let current = rawPurchases[i];
          //console.log(`to---${fTo}---from---${fFr}---`)
          if (fTo && fFr){
          //  console.log(`fTo && fFr--- ${fTo}---${fFr}`);
            if (current.toAddr===fTo && current.fromAddr===fFr){
              toReturn.push(current);
            }
          }else if (fTo){
          //  console.log(`fTo--- ${fTo}`);
            if (current.toAddr===fTo){
              toReturn.push(current);
            }
          }else if (fFr){
          //  console.log(`fFr ---${fFr}`);
            if (current.fromAddr===fFr){
              toReturn.push(current);
            }
          }

        }
      }else { // no filterOptions provided
        toReturn = rawPurchases;
      }
      dispatch(receivePurchases(toReturn));
    }
}

export const fetchRatingsForProviders = () => {
  let ratingsMap = new Map();
  let countMap = new Map();

  return (dispatch, getState) => {
    //console.log(`fetchRatingsForProviders() current statetree---${JSON.stringify(getState().appStateTree)}`)
    let allRatings = getState().appStateTree.ratings;
    //console.log(`current ratings size=${allRatings.length}`)

    for (var i=0; i<allRatings.length; i++){
      //console.log(`current rating=${JSON.stringify(allRatings[i])}`);
      let current = allRatings[i].providerAddr;
      let mapGet = ratingsMap.get(current); //already val for this provider?

      if (!mapGet){
        //console.log(`no val for this provider ${current}, setting this val ${allRatings[i].rating}`)
        ratingsMap.set(current, allRatings[i].rating);
        countMap.set(current, 1);
      }else{
  //      console.log(`this provider ${current} has an entry which is ${mapGet}`);
        let ratingCount = countMap.get(current);
        let newRating = 0;
      //  console.log(`rating count:${ratingCount}, adding rating:${allRatings[i].rating}`);
        ratingCount = ratingCount + 1;
        newRating = (new Number(mapGet * new Number(ratingCount-1)) + new Number((allRatings[i].rating))) / new Number(ratingCount);
        //console.log(`${mapGet}+${allRatings[i].rating}/${ratingCount}`);
        countMap.set(current, ratingCount);
        ratingsMap.set(current, newRating);
        //console.log(`outvals for addr${current} are ratingCount:${ratingCount}, newRating:${newRating}`);
      }
    }
    //package up in an array
    let ratingsArray = [];
    let iterator = ratingsMap[Symbol.iterator]();
    for (let item of iterator) {
      ratingsArray.push(item);
    }
    //console.log(`ratingsArray---${JSON.stringify(ratingsArray)}`);
    dispatch(receiveProviderAvgRatings(ratingsArray));
  }
}




/* lets other users know that this user is
   online and can interact
*/
export const pulse = neoAddr => dispatch => {
  //pulse my neoaddr
  let postUrl = ILLI_SERVER_URL + "/pulse?neo_addr=";
  postUrl = postUrl + neoAddr;
  $.post(postUrl);

  //get the list of everyone online
  let getUrl = ILLI_SERVER_URL + "/online";
  $.getJSON(getUrl, function(data){
    dispatch(receiveOnline(data));
  });
}


export const formStartup = () => {
    return (dispatch, getState) => {
      new Promise((resolve, reject) => {
        console.log('promise - add provider startup');
        dispatch(getAppState());
        resolve();
      }).then(() => {
        console.log("then() get neo address");
        dispatch(retrieveNeoAddr());
      }).then(() => {
        setTimeout(function(){
          console.log("then() fetch ratings on delay");
          dispatch(fetchRatingsForProviders());
        }, 500)


      }).catch((err) => {
        dispatch(errorMessage(`Error: ${err.message} while loading data on generic action.formStartup()`));
      });
    }
}

export const errorOnNeoAddrInUseForProvider = (neoAddr) => {
    return (dispatch, getState) => {
      let users = getState().appStateTree.users;

      if (neoAddr==="" || neoAddr==false){
        neoAddr = getState().neo_addr;
      }
      console.log(`neoaddr = ${neoAddr}`);
      let inUse = neoAddrInUseForProvider(users, neoAddr);
      if (inUse > -1){
        dispatch(errorMessage("This neoAddr is already in use for a Provider account."
              + "Either edit your existing account or use a different address, you will not be able to proceed with adding a provider for an address already in use."));
      }
    }
}


export const deleteProvider = (neoAddr, serviceName) => {
  return (dispatch, getState) => {
    console.log("action.deleteProvider()-" + neoAddr + "-" + serviceName);
    //console.log(JSON.stringify(users));
    let users = getState().appStateTree.users;
    let doesExist = accountExists(users, neoAddr, serviceName);

    /*!!! TODO:what if users wasnt fetched? */
    console.log("exists?" + doesExist);

    if (doesExist > -1) {
      //remove user
      users.splice(doesExist, 1);
      let newState = getState().appStateTree;
      newState.users = users;

      dispatch(setAppStateTree(newState));
    } else {
      dispatch(warningMessage("attempted to delete user that does not exist!:" +
                    neoAddr + "-" + serviceName));
    }
  }
}


/* Searches user array, checks that neoAddr in use + isProvider is true
*/
const neoAddrInUseForProvider = (usersArray, neoAddr) => {
  for (var i = 0; i < usersArray.length; i++) {
    console.log(`${usersArray[i].neo_addr}--${neoAddr}-----isProvider?=${usersArray[i].is_provider}`)
    if (usersArray[i].neo_addr===neoAddr && usersArray[i].is_provider===true){
      console.log("user already in use (neo addr is used for a provider)")
      return i;
    }
  }
  return -1;
}


/* Searches user array to see if neo address and service name match
  RETURNS array index if match found, otherwise returns -1 (not found)
*/
const accountExists = (usersArray, neoAddr, serviceName) => {
  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i].neo_addr===neoAddr && usersArray[i].service_name===serviceName){
      return i;
    }
  }
  return -1;
}

export const makePurchase = (toAddr, amt) => {
  console.log('action.makePurchase()');

  return (dispatch, getState) => {
    const asset = GAS;
    console.log(`asset:${asset}`)
    //nos.getBalance(asset)
    nos.getBalance({ asset: GAS })
      .then((balance) => {
        console.log(`balance is:${balance} and amout to send is: ${amt}`);
        return balance;
      })
      .then((balance) => {
        console.log(`balance again is:${balance}`);
        console.log(`address is:${toAddr}`);
        console.log(`amt is:${amt}`)
        console.log("SKIPPING NOS transaction to send");

        dispatch(addPurchaseToState(getState().appStateTree,
                  toAddr, getState().neo_addr, amt, "NEED TO FIX THIS"));
      /*  const amount = amt;
        const receiver = toAddr;
        nos.send({ asset: GAS, amount, receiver })
        .then((txid) => dispatch(infoMessage(`${amount} GAS sent in transaction ${txid}`)))
        .catch((err) => dispatch(errorMessage(`Error: ${err.message}`)));*/
      })
      .catch((err) => dispatch(errorMessage(`Error while making purchase: ${err.message}`)));
  }
}

export const addPurchaseToState = (stateTree, toAddr, fromAddr, amt, txId) => dispatch => {
  let toAdd = {
    'fromAddr': fromAddr,
    'toAddr': toAddr,
    'amt': amt,
    'trxId': txId,
    'interactionState': 1,
    'timeStamp': Date.now()
  }
  console.log (`adding purchase ${JSON.stringify(toAdd)}`);
  let purchasesState = stateTree.purchases
  console.log(`purchases: ${JSON.stringify(purchasesState)}`)
  purchasesState.push(toAdd);
  stateTree.purchases = purchasesState;
  dispatch(setAppStateTree(stateTree));
}


export const addRatingToState = (providerAddr, comments, rating) => {
  return (dispatch, getState) => {
    let stateTree = getState().appStateTree;
    let fromAddr = getState().neo_addr;
    let toAdd = {
      'fromAddr': fromAddr,
      'providerAddr': providerAddr,
      'rating': rating,
      'comments': comments,
      'timeStamp': Date.now()
    }
    console.log (`adding rating ${JSON.stringify(toAdd)}`);
    let ratingsState = stateTree.ratings
    console.log(`ratings: ${JSON.stringify(ratingsState)}`)
    ratingsState.push(toAdd);
    stateTree.ratings = ratingsState;
    //console.log(`new state tree with rating=${stateTree}`);
    dispatch(setAppStateTree(stateTree));
  }

}


/* save state tree to IPFS */
export const setAppStateTree = stateTree => dispatch => {
  dispatch(startInProgress());

  console.log(JSON.stringify(stateTree));

  let stateTreeJSON = JSON.parse(JSON.stringify(stateTree));

  var ifpsBuffer = Buffer.from(JSON.stringify(stateTreeJSON));
  var ipfs = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'});
  ipfs.add([ifpsBuffer], {pin:false})
          .then(response => {
              addIPFSKeytoBlockchain(response[0].hash, dispatch);
          }).catch((err) => {
             dispatch(errorMessage(`Error: ${err.message}`));
          });

}


/* save ipfs key to neo block */
const addIPFSKeytoBlockchain = (hash, dispatch) => {
  console.log("adding ipfs hash to blockchain:" + JSON.stringify(hash));
  console.log("scriptHash:" + JSON.stringify(scriptHash));

  /***
    nos.invoke({ scriptHash, operation, args, encodeArgs: false })
  ***/

  const operation = "Save";
  const args = [APP_STATE_KEY, hash];
  nos.invoke({scriptHash, operation, args})
      .then((txid) => dispatch(infoMessage(`Data saved to blockchain txid: ${txid}.
         It may take a few minutes or even a few hours for your changes to show
         up in the app depending on how busy the blockchain is.`)))
      .catch((err) => dispatch(errorMessage(`Error: ${err.message}`)));
}

/* save ipfs key to neo block */
/*const addIPFSKeytoBlockchain = hash => {
  console.log("adding ipfs hash to blockchain:" + JSON.stringify(hash));
  console.log("scriptHash:" + JSON.stringify(scriptHash));

  const operation = "Save";
  const args = [APP_STATE_KEY, hash];
  nos.invoke({scriptHash, operation, args})
      .then((txid) => alert(`Data saved to blockchain txid: ${txid} `))
      .catch((err) => alert(`Error: ${err.message}`));
      //!!! TODO: FIX THIS
      //.then((txid) => recieveAppState())
}*/

export const getAppState = () => dispatch => {
  dispatch(startInProgress());
  fetchKey(dispatch);
}


export const retrieveNeoAddr = () => dispatch => {
    dispatch(startInProgress());
    fetchNeoAddr(dispatch);
  //  fetchKey(dispatch);
}


//export const addProvider = provider => {
    //dispatch(requestAddProvider(provider));
  //  doAddProvider(provider, dispatch, getState);
    //fetchKey(dispatch);
//}


/*export const fetchRatingsIfNeeded = ratings => (dispatch, getState) => {
    if (shouldFetchRatings(getState(), ratings)){
      return dispatch(fetchRatings(ratings));
    }
}*/


export function addProvider (providerToAdd) {
  console.log("addProvider()" + providerToAdd);

  return (dispatch, getState) => {
      //disallow more than one neo addr
      if (neoAddrInUseForProvider(getState().appStateTree.users, getState().neo_addr) > -1){
        dispatch(errorMessage("Can not create provider from this neo addr, already in use."));
        return;
      }

      dispatch(startInProgress());
//      console.log("calling getState...");

      //const { appStateTree } = getState();
      appStateTree = getState()
  //    console.log("appState tree..." + JSON.stringify(appStateTree));
  //    console.log("provider to add..." + JSON.stringify(providerToAdd));
      let appStateTreeJSON = JSON.parse(JSON.stringify(appStateTree));
      let usersJSON = appStateTreeJSON.appStateTree.users;

      //add in neo_addr
      providerToAdd.neo_addr = appStateTree.neo_addr;

      usersJSON.push(providerToAdd);
      //console.log("users array..." + JSON.stringify(usersJSON));
      appStateTreeJSON.appStateTree.users = usersJSON;
    //  console.log("appState after add..." + JSON.stringify(appStateTreeJSON));

      dispatch(setAppStateTree(appStateTreeJSON.appStateTree));
  }
}

export const retrieveKeyFromBlock = () => dispatch => {
  dispatch(startInProgress());
  fetchKey(dispatch);
}



const fetchKey = dispatch => {
  console.log("fetching ipfs from blockchain");
  const operation = "Get";
  const args = [APP_STATE_KEY]
  return nos.testInvoke({scriptHash, operation, args})
    .then(data => u.hexstring2str(data.stack[0].value))
    .then(key => retrieveFromIPFSandDispatchKey(dispatch, key))
    .catch((err) => dispatch(errorMessage(`Error: ${err.message}, while fetching
      key from block. There is likely an issue with the blockchain or the smart contract.`)));
}


const retrieveFromIPFSandDispatchKey = (dispatch, key) =>{
  console.log("retrieveAndDispath()");
  dispatch(retrieveStateKey(key));
  handleLoadStateFromIPFS(dispatch, key);
}

const handleLoadStateFromIPFS = (dispatch, key) => {
  console.log("loading from ipfs, for key:" + key);
  var ipfs = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'});
  ipfs.files.get(key)
    .then(files => processIPFSRetrieve(dispatch, files))
    .catch((err) => dispatch(errorMessage(`Error: ${err.message}. while loading from IPFS`)));
}

const processIPFSRetrieve = (dispatch, files) => {
  console.log("processIPFS Retrieve");
  files.forEach((file) => {
    let result = file.content.toString('utf8');
    let returnedJSON = JSON.parse(result);
    dispatch(receiveAppState(returnedJSON));
    dispatch(endInProgress());
  })
}

export const startInProgress = () => ({
  type: START_IN_PROGRESS
})

export const endInProgress = () => ({
  type: END_IN_PROGRESS
})

const recieveNeoAddr = neo_addr => ({
  type: RECEIVE_NEO_ADDR,
  neo_addr
})


const retrieveStateKey = appStateKey => ({
  type: RECEIVE_APP_STATE_KEY,
  appStateKey
})

const receiveAppState = appStateTree => ({
  type: RECEIVE_APP_STATE,
  appStateTree
})

const receiveOnline = onlineList => ({
  type: RECEIVE_ONLINE,
  onlineList
})

const receivePurchases = purchases => ({
  type: RECEIVE_PURCHASES,
  purchases
})

/*
export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})*/

 const receiveRatings = (ratings) => ({
  type: RECEIVE_RATINGS,
  ratings/*,
  receivedAt: Date.now()*/
})


const receiveProviderAvgRatings = (providerAvgRatings) => ({
 type: RECEIVE_PROVIDER_AVG_RATINGS,
 providerAvgRatings
})

export const fetchKeyvalFromBlock = key => {
  console.log("fetchKeyvalFromBlock key:" + key);
}

export const fetchRatings = ratings => dispatch => {
    dispatch(requestRatings(ratings));
    fetchKey(dispatch);
}


const fetchRatingsFromIPFS = () => {
  return (dispatch, getState) => {
    const {key} = getState().key;
    console.log("key for fetch from IPFS:" + key);
  }
}

//nos.getAddress()
//  .then((address) => alert(`Address: ${address}`))
//  .catch((err) => alert(`Error: ${err.message}`));

const fetchNeoAddr = dispatch => {
  return nos.getAddress()
    .then(address => dispatch(recieveNeoAddr(address)))
    .catch(err => dispatch(errorMessage(`Error: ${err.message}` + " while fetching NeoAddr")));

/*  nos.getAddress()
  .then((address) => dispatch(recieveNeoAddr(address))
  .catch((err) => alert(`Error: ${err.message}`));*/
}



/**
const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}


const shouldFetchRatings = (state, ratings) => {
  return true;
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}


export const fetchRatingsIfNeeded = ratings => (dispatch, getState) => {
    if (shouldFetchRatings(getState(), ratings)){
      return dispatch(fetchRatings(ratings));
    }
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
*/
