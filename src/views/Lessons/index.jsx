import React from "react";
import Backbone from "backbone";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Menu from "./../../components/Menu";
import RTCVideoChat from "./../../components/RTCVideoChat";

class Lessons extends React.Component {

  render() {

    let activePath = Backbone.history.getFragment();

    console.log("location:" + window.location);

    let url = window.location.href
    let url_tokens = url.split("/");
    let base_location = "https://" + url_tokens[2];
    console.log("base location details:" + base_location);

    return (
      <div>

        <p> LESSONS </p>

            <RTCVideoChat />

        </div>
  )}
}
module.exports = Lessons
