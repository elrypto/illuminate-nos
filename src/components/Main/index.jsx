import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";
import BigCard from "./../BigCard";

const { injectNOS, nosProps } = react.default;

const styles = {
};

class Main extends React.Component {
  handleAlert = async func => alert(await func);

  doFetchCards() {
    return (
      [
       {
         ///"http://dx5vpyka4lqst.cloudfront.net/products/438457/images/full.jpeg"
        neo_addr: "",
         service_name : "Chef Elaine cooks with you",
         description : "I will make dishes with you in real time",
         rating : "Rating: Not Yet",
         profile_link_out : "https://twitter.com/",
         tags: "cooking, chef, cuisine",
         provider_name : "Chef Elaine L",
         preferred_method : "1",
         //image_url: "/assets/match_resume_to_job.jpg",
         image_url: "http://oi50.tinypic.com/25oz9cp.jpg",
         std_lesson_duration: "0.25",
         price_per_15 : "0.15",
         num_lessons_delivered : "0"
       },
       {
         neo_addr: "",
         service_name : "Javasript Development Expert",
         description : "Design, Development Suggestions and Help resolving issues",
         rating : "Rating: Not Yet",
         profile_link_out : "https://twitter.com/",
         tags: "js, javascript, react, angular...",
         provider_name : "Morpheus",
         preferred_method : "2",
        // image_url: "/assets/course-java.png",
        image_url: "http://oi47.tinypic.com/30b3b49.jpg",
         std_lesson_duration: "0.5",
         price_per_15 : "0.15",
         num_lessons_delivered : "0"
       },
       {
         neo_addr: "",
         service_name : "Yoga postures private lessons",
         description : "Better yoga postures, with private yoga sessions onlinee",
         rating : "Rating: Not Yet",
         profile_link_out : "https://twitter.com/",
         tags: "yoga, kundalini",
         provider_name : "Savi Viens",
         preferred_method : "1",
         //image_url: "/assets/ellery-yoga-lessons.jpg",
         image_url: "http://oi40.tinypic.com/30wv9jd.jpg",
         std_lesson_duration: "0.5",
         price_per_15 : "0.3",
         num_lessons_delivered : "0"
       }
     ]
   )
  }

  constructor(props){
    super(props);
    this.state = {
      bigCards: []
    }
  }

  componentDidMount(){
    console.log("fetching cards...")
    let fetchedCards = [];
    fetchedCards = this.doFetchCards();
    console.log("big cards fetched: " + fetchedCards.length)
    this.setState({bigCards: fetchedCards})
  }

handleGetBalance = async () => await nos.getBalance({ asset: neo });
handleGetAddress = async () => await nos.getAddress();


render() {
  const { classes, nos } = this.props;
  const neo = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";

  /* TODO: retrieve from this.state
   * workaround retrieves on every render, which is not efficient when
   * hooked up to a real source (remote or blockchain)
  */
  let bigCards = this.doFetchCards();

  return(
  <React.Fragment>
    <main role="main">

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            {bigCards.map(function(card, i){
                return <BigCard neo_addr={card.neo_addr}
                  service_name={card.service_name}
                  description={card.description}
                  rating={card.rating}
                  profile_link_out={card.profile_link_out}
                  tags={card.tags}
                  preferred_method={card.preferred_method}
                  image_url={card.image_url}
                  price_per_15={card.price_per_15}
                  std_lesson_duration={card.std_lesson_duration}
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

Main.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(Main));
