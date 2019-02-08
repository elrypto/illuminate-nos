import React from "react";
import PropTypes from 'prop-types'
import Backbone from "backbone";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Menu from "./../../components/Menu";
import ProviderForm from "./../../components/ProviderForm";
import { retrieveNeoAddr } from '../../actions'
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';


class AddProvider extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(retrieveNeoAddr());
  }


  render() {
    const { neo_addr, notifications } = this.props;
    console.log("neoaddr:" + JSON.stringify(neo_addr));

    let activePath = Backbone.history.getFragment();

    return (
        <main role="provider_form">
          <Notifications notifications={notifications} />
          <ProviderForm neo_addr={neo_addr} />
        </main>
    )}
}


const mapStateToProps = state => {
  const { notifications } = state
  const { neo_addr } = state.neo_addr

  return {
    neo_addr, notifications
  }
}
export default connect(mapStateToProps)(AddProvider)
