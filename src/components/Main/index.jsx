import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";

const { injectNOS, nosProps } = react.default;

const styles = {
};

class Main extends React.Component {
  handleAlert = async func => alert(await func);

  constructor(props){
    super(props);
    this.state = {
      neoAddress: "...",
    }
  }

  componentDidMount(){}

handleGetBalance = async () => await nos.getBalance({ asset: neo });
handleGetAddress = async () => await nos.getAddress();

render() {
  const { classes, nos } = this.props;

  const neo = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";


  return(
  <React.Fragment>
    <main role="main">

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">

            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={require('/assets/match_resume_to_job.jpg')} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text">Resume Fine Tuning</p>
                  <p class="card-text">20 Year HR Professional, I will fix your resume</p>
                  <p class="card-text">Rating: Not Yet</p>
                  <p class="card-text"># careers, resume, HR</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
                    </div>
                    <small class="text-muted">15 ILLI/.015 GAS</small>
                    <small class="text-muted">15 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={require('/assets/course-java.png')} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text">Neo and nOS dApps Expert</p>
                  <p class="card-text">Design, Development Suggestions and Help resolving issues</p>
                  <p class="card-text">Rating: Not Yet</p>
                  <p class="card-text"># blockchain, nOS, Neo...</p>

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
                    </div>
                    <small class="text-muted">10 ILLI/.01 GAS</small>
                    <small class="text-muted">5 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={require('/assets/ellery-yoga-lessons.jpg')} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text">Yoga postures private lessons</p>
                  <p class="card-text">Better yoga postures, with private yoga sessions online</p>
                  <p class="card-text">Rating: Not Yet</p>
                  <p class="card-text"># yoga, kundalini</p>

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
                    </div>
                    <small class="text-muted">5 ILLI/.005 GAS</small>
                    <small class="text-muted">5 mins</small>
                  </div>
                </div>
              </div>
            </div>

            <p>balance: {this.handleGetAddress} </p>

          </div>
        </div>
      </div>


    </main>
  </React.Fragment>
);
 }
}

Main.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(Main));
