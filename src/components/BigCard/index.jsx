import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {
};

class BigCard extends React.Component {

render() {

  return(
  <React.Fragment>

            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={new String(this.props.image_url)} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text">{this.props.service_name}</p>
                  <p class="card-text">{this.props.description}</p>
                  <p class="card-text">{this.props.rating}</p>
                  <p class="card-text">#{this.props.tags}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
                    </div>
                    <small class="text-muted">{this.props.price_per_15} GAS / 15 Mins</small>
                    <small class="text-muted">{this.props.std_lesson_duration} Mins avg.</small>
                  </div>
                </div>
              </div>
            </div>

  </React.Fragment>
);
 }
}

BigCard.propTypes = {
};

export default injectSheet(styles)(BigCard);
