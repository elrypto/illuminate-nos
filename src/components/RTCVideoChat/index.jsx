import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {
  "@import": "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
  "@global html, body": {
    fontFamily: "Source Sans Pro",
    margin: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  App: {
    textAlign: "center"
  },
  intro: {
    fontSize: "large"
  },
  lineBreak: {
    width: "75%",
    borderTop: "1px solid #333333",
    margin: "32px auto"
  }
};

class RTCVideoChat extends React.Component {

  constructor(props){
    super(props);

    this.bindMethods();

    this.state = {
      localVideo: null,
      localStream: null
    }
  }

  componentDidMount(){

  }

  gotStream(){
    console.log('Received local stream');
    this.state.localVideo.srcObject = stream;
    this.state.localStream = stream;
    //callButton.disabled = false;

    this.state.localVideo.addEventListener('loadedmetadata', function() {
      console.log(`Local video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
    });
  }


  connect(){
    console.log('Requesting local stream');
    //startButton.disabled = true;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(this.gotStream)
      .catch(e => alert(`getUserMedia() error: ${e.name}`));
  }

  startCall(){

  }

  disconnect(){

  }


  bindMethods(){
    this.gotStream = this.gotStream.bind(this);
    this.connect = this.connect.bind(this);
    this.startCall = this.startCall.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }


  render(){

    return (
        <div id="container">
          <video id="localVideo" playsInline autoPlay muted></video>
          <video id="remoteVideo" playsInline autoPlay></video>
          <div>
            <button id="startButton" onClick={this.connect.bind(this)}>Start</button>
            <button id="callButton" onClick={this.startCall.bind(this)}>Call</button>
            <button id="hangupButton" onClick={this.disconnect.bind(this)}>Hang Up</button>
          </div>
      </div>
    );
  }
}

RTCVideoChat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(RTCVideoChat);
