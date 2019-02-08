import React from "react";
import Backbone from "backbone";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Menu from "./../../components/Menu";


class  Categories extends React.Component {

  render() {

  let activePath = Backbone.history.getFragment();

  return (

      <p>Categories</p>

  )}
}
module.exports = Categories
