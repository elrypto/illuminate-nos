import React from "react";
import { connect } from 'react-redux';
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import BigCard from "./../BigCard";
import { getAppState, retrieveNeoAddr, makePurchase, fetchRatingsForProviders,
         ratingForAddr, endInProgress, formStartup, IPFS_BASE_URL,
         trimStr } from '../../actions';
import { PropagateLoader } from 'react-spinners';

const styles = {};


class Main extends React.Component {

  constructor (props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(formStartup());
  }

  componentDidUpdate(){
    //update users with their ratings, which come on delay
    const { providerAvgRatings } = this.props;
    console.log("providerAvgRatings");
    console.log(JSON.stringify(providerAvgRatings));
  }


render() {
  const { inProgress, appStateTree, users, providerAvgRatings } = this.props;

  //console.log(`render(), providerAvgRatings---${providerAvgRatings}`);

  return(
  <React.Fragment>
    <main role="main">

      <div class="album py-5 bg-light">
        <div class="container">

        <PropagateLoader
          sizeUnit={"px"}
          size={15}
          color={'#59a5db'}
          loading={inProgress}
        />

          <div class="row">
            {users.map(function(card, i){
                return <BigCard
                  neo_addr={card.neo_addr}
                  name={trimStr(card.name, 25)}
                  service_name={trimStr(card.service_name, 25)}
                  description={trimStr(card.service_description, 50)}
                  rating={ratingForAddr(providerAvgRatings, card.neo_addr)}
                  profile_link_out={card.profile_link_out}
                  tags={trimStr(card.service_keywords, 25)}
                  preferred_method={card.preferred_method}
                  image_url={IPFS_BASE_URL + card.ipfs_image_hash}
                  price={card.price}
                  avg_interaction_time={card.avg_interaction_time}
                  users={users}
                />;
             })}

          </div>
        </div>
      </div>
    </main>
  </React.Fragment>
  );
 }
}

const mapStateToProps = state => {

  const {appStateTree, inProgress, providerAvgRatings} = state;
  const users = appStateTree.users;

  return {
    appStateTree, users, inProgress, providerAvgRatings
  }
}

export default connect(mapStateToProps)(Main)
