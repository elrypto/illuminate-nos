import React from "react";
import Backbone from "backbone";
import Header from "./../../components/Header";
import JumboTron from "./../../components/JumboTron";
import Main from "./../../components/Main";
import Footer from "./../../components/Footer";
import Menu from "./../../components/Menu";
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';


class App extends React.Component {

  render() {
    const {notifications} = this.props;
    let activePath = Backbone.history.getFragment()
    return (
      <div id="content">

        <Notifications notifications={notifications} />

        <Header title="illuminate" />

        <Menu />

        {this.props.children}

        <Footer />

      </div>
    )
  }
}
const mapStateToProps = state => {
  const {notifications} = state
  return {notifications}
}

export default connect(mapStateToProps)(App)
