import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {
};

const Main = ({ classes, title }) => (
  <main role="main">

    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">The Microlessons community</h1>
        <p class="lead text-muted">Learn anything quickly with one on one
        instruction. Teach others and earn. All with crypto currencies.</p>
        <p>
          <a href="#" class="btn btn-primary my-2">Get Started</a>
          <a href="#" class="btn btn-secondary my-2">Learn more</a>
        </p>
      </div>
    </section>

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
                  <small class="text-muted">15 ILLI/.015 NEO</small>
                  <small class="text-muted">15 mins</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <img class="card-img-top" src={require('/assets/course-java.png')} alt="Card image cap"/>
              <div class="card-body">
                <p class="card-text">nOS or Neo dApps Expert</p>
                <p class="card-text">Design, Development Suggestions and Help resolving issues</p>
                <p class="card-text">Rating: Not Yet</p>
                <p class="card-text"># blockchain, nOS, Neo...</p>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
                  </div>
                  <small class="text-muted">10 ILLI/.01 NEO</small>
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
                <p class="card-text">Let me help you fix your postures, with private yoga sessions online</p>
                <p class="card-text">Rating: Not Yet</p>
                <p class="card-text"># yoga, kundalini</p>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
                  </div>
                  <small class="text-muted">5 ILLI/.005 NEO</small>
                  <small class="text-muted">5 mins</small>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>


  </main>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default injectSheet(styles)(Main);
