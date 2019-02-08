import { combineReducers } from 'redux';
import{
  SELECT_RATINGS, REQUEST_RATINGS, RECEIVE_RATINGS, REQUEST_ADD_PROVIDER,
  REQUEST_NEO_ADDR, RECEIVE_NEO_ADDR, REQUEST_APP_STATE, RECEIVE_APP_STATE,
  RECEIVE_APP_STATE_KEY, RECEIVE_ONLINE, START_IN_PROGRESS, END_IN_PROGRESS,
  RECEIVE_PROVIDER_AVG_RATINGS, RECEIVE_PURCHASES
} from '../actions';


/* TODO: TEMP - combine reducers here, to resolve issue with configureStore
        and seemingly, calling combine reducers again
*/
import {reducer as notifications} from 'react-notification-system-redux';


export const DEFAULT_APP_STATE_TREE =
{
    users: [],
    categories: ["Software/Programming",
                "Technology/Infastructure",
                "Online Coaching/Teaching",
                "Business Services",
                "Other"],
    providerAvgRatings: {},
    ratings: [],
    purchases: []
}


const neo_addr = (state = '', action) => {
  switch (action.type) {
    case REQUEST_NEO_ADDR:
      return {
        ...state
      //  inProgress: true
      }
      case RECEIVE_NEO_ADDR:
        return action.neo_addr
    default:
      return state
  }
}


const onlineList = (state = [], action) => {
  switch (action.type) {
      case RECEIVE_ONLINE:
          return action.onlineList
        default:
          return state
  }
}

const provider = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ADD_PROVIDER:
      return {
        ...state
      }
    default:
      return state
  }
}

const appStateTree = (state = DEFAULT_APP_STATE_TREE, action) => {
  switch (action.type) {
    case REQUEST_APP_STATE:
      return {
        ...state
      }
    case RECEIVE_APP_STATE:
    //  console.log("appStateTree.RECIEVE_APP_STATE.state:" + JSON.stringify(state));
    //  console.log("appStateTree.RECIEVE_APP_STATE.action:" + JSON.stringify(action));
      return action.appStateTree;
    default:
      return state
  }
}


const appStateKey = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_APP_STATE_KEY:
       return Object.assign({}, state, action.appStateKey);
    default:
      return state
  }
}

const inProgress = (state = false, action) => {
  switch (action.type) {
    case START_IN_PROGRESS:
    //  console.log("reached reducer.inProgress.START");
       return true;
    case END_IN_PROGRESS:
  //    console.log("reached reducer.inProgress.END");
       return false;
    default:
      return state
  }
}

const providerAvgRatings = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PROVIDER_AVG_RATINGS:
      return action.providerAvgRatings;
    default:
      return state
  }
}

const ratings = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RATINGS:
      return action.ratings;
    default:
      return state
  }
}

const purchases = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PURCHASES:
      return action.purchases;
    default:
      return state
  }
}
/*
const ratings = (state = [], action) => {
  switch (action.type) {

    case REQUEST_RATINGS:
      return {
        ...state
      }
    case RECEIVE_RATINGS:
      return {
        ...state,
        ratings: action.ratings
      }
    default:
      return state
  }
}*/
/*
const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}*/


const rootReducer = combineReducers({
  neo_addr, appStateKey, appStateTree, onlineList, inProgress, notifications,
  providerAvgRatings, purchases
})

export default rootReducer
