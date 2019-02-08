import React from "react";
import Backbone from "backbone";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Menu from "./../../components/Menu";
import BackEnd from "./../../components/BackEnd";
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { PropagateLoader } from 'react-spinners';
import { authorizedToView, retrieveNeoAddr } from '../../actions'

class Admin extends React.Component {

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(retrieveNeoAddr());
    //authorizedToView(neo_addr);
  }

  render() {
    const {notifications, inProgress, neo_addr, dispatch} = this.props;
    let activePath = Backbone.history.getFragment();

    return (
        <main role="admin">
          <Notifications notifications={notifications} />
          <div class="album py-5 bg-light">
            <div class="container">

              {inProgress ?
                <PropagateLoader
                  sizeUnit={"px"}
                  size={15}
                  color={'#59a5db'}
                  loading={inProgress}
                />
                :
                <div style={{ opacity: inProgress ? 0.5 : 1 }}>
                  <h3> -- Admin  -- </h3>
                  <BackEnd />
                </div>
              }
            </div>
          </div>
        </main>
  )}
}

const mapStateToProps = state => {
  const {notifications, inProgress, neo_addr} = state
  return {notifications, inProgress, neo_addr}
}

export default connect(mapStateToProps)(Admin)
