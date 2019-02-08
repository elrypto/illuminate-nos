import React from "react";
import { connect } from 'react-redux';
import Backbone from "backbone";
import LittleCard from "./../../components/LittleCard";
import { getAppState, retrieveNeoAddr, pulse } from '../../actions';
import Notifications from 'react-notification-system-redux';


class  Interact extends React.Component {

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(retrieveNeoAddr());
    dispatch(getAppState());

    this.pulseOnline();
    this.interval = setInterval(() => {
      this.pulseOnline()
    }, 5000)
  }

  componentWillUnmount(){
    clearInterval(this.interval);

    //TODO: also, set "me" not online
  }

  pulseOnline = () => {
    const {dispatch, neo_addr} = this.props;
    dispatch(pulse(neo_addr));
  }


  render() {
    const { dispatch, inProgress, appStateTree,
      users, onlineList, notifications } = this.props

    //console.log(JSON.stringify(users));

    //onLineList.find(card.neo_add))


    return (
      <React.Fragment>
        <div class="album py-5 bg-light">
        <Notifications notifications={notifications} />
          <div class="container">
          <LittleCard users={users} onlineList={onlineList} />
          {/*users.map(function(card, i){

              console.log("in user.map");
              console.log("users in onlineList:" + JSON.stringify(onlineList))

              console.log(card.neo_addr);
              let match = false
              if (onlineList.indexOf(card.neo_addr) > -1){
                match = true;
              }
              console.log("match?" + match)

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
                online_now={match}
              />;
           })*/}
         </div>
      </div>
    </React.Fragment>
  );
  }
}


const mapStateToProps = state => {
  const {appStateTree, neo_addr, onlineList, notifications} = state
  const users = appStateTree.users

  return {
    appStateTree, users, neo_addr, onlineList, notifications
  }
}
export default connect(mapStateToProps)(Interact)
