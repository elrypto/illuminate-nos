import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import Backbone from "backbone";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { create as createJss } from "jss";
import camelCase from "jss-camel-case";
import globalStyles from "jss-global";
import vendorPrefixer from "jss-vendor-prefixer";
import { JssProvider } from "react-jss";

import App from "./views/App";
import Categories from "./views/Categories";
import Providers from "./views/Providers";
import Lessons from "./views/Lessons";
import Interact from "./views/Interact";
import AddProvider from "./views/AddProvider";
import Admin from "./views/Admin";
import Main from "./components/Main";
import JumboTron from "./components/JumboTron";
import configureStore from './config/configureStore'

import jQuery from "jquery";



const store = configureStore()
let content = document.getElementById('root');


const Router = Backbone.Router.extend({
  routes: {
    ''    : 'index',
    'providers' : 'providers',
    'provider/new' : 'addProvider',
    'categories' : 'categories',
    'lessons' : 'lessons',
    'admin' : 'admin',
    'interact' : 'interact'
  },
  index: function() {
    render(
      <Provider store={store}>
        <App id="index" router={router}>
            <JumboTron />
            <Main />
        </App>
      </Provider>
      , content)
  },
  providers: function() {
    render(
      <Provider store={store}>
        <App id="providers">
          <Providers />
        </App>
      </Provider>
      , content)
  },
  addProvider: function() {
    render(
      <Provider store={store}>
        <App id="addProvider">
          <AddProvider />
        </App>
      </Provider>
      , content)
  },
  categories: function() {
      render(
      <Provider store={store}>
        <App id="categories">
            <Categories />
        </App>
      </Provider>
      , content)
  },
  lessons: function() {
      render(
      <Provider store={store}>
        <App id="lessons">
            <Lessons />
        </App>
      </Provider>
      , content)
  },
  admin: function() {
      render(
      <Provider store={store}>
        <App id="admin">
            <Admin />
        </App>
      </Provider>
      , content)
  },
    interact: function() {
      render(
      <Provider store={store}>
        <App id="interact">
            <Interact />
        </App>
      </Provider>
      , content)
    }
})

let router = new Router()
Backbone.history.start()
