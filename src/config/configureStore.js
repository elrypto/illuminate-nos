import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './../reducers'
//import {reducer as notifications} from 'react-notification-system-redux';




export default function configureStore(preloadedState) {
/*  const middlewares = [loggerMiddleware, thunkMiddleware]

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)
​
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
​*/

  const middleware = [ thunk ]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  /* Had to combine reducers in the project reducer file
    unfortunately, combining here broke for some reason
  */
  //const reducers = combineReducers(notifications, reducer);
  const store = createStore(
      reducer, preloadedState, applyMiddleware(...middleware)
  )

  return store
}
