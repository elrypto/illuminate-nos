import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { formStartup, makePurchase, priceForAddr } from '../../actions';

const styles = {};


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class BigCard extends React.Component {


  handlePurchaseLesson = e => {
    //button id set to neo addr
    let toPurchaseAddr = e.target.id;
    this.props.dispatch(makePurchase(toPurchaseAddr, this.props.price));
  }


  render() {

    let startButton = "";
    //console.log("purchased:" + this.state.purchased)
    if (this.props.purchased && this.props.purchased===true){
      startButton = <button id="startButton" onClick={window.location="/#/interact"} type="button" class="btn btn-sm btn-outline-secondary">Start</button>
    }



  return(
  <React.Fragment>
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={this.props.image_url} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text-service-name">{this.props.service_name}</p>
                  <p class="card-text-small">{this.props.name}</p>
                  <p class="card-text-small">{this.props.description}</p>
                  <StarRatingComponent
                     name="rate2"
                     starCount={5}
                     editing={false}
                     value={this.props.rating}
                   />
                  <p class="card-text-small">#{this.props.tags}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button id={this.props.neo_addr}
                        disabled={this.props.purchased}
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        onClick={this.handlePurchaseLesson}>Purchase Lesson
                      </button>
                      {startButton}
                    </div>
                    <small class="text-muted">{this.props.price} GAS</small>
                  </div>
                </div>
              </div>
            </div>

  </React.Fragment>
  );}
}

BigCard.propTypes = {
};

const mapStateToProps = state => {

  const {appStateTree, inProgress, providerAvgRatings} = state;
  const users = appStateTree.users;

  return {
    appStateTree, users, inProgress, providerAvgRatings
  }
}

export default connect(mapStateToProps)(BigCard)

