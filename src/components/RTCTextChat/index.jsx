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

class RTCTextChat extends React.Component {

  constructor(props){
    super(props);

    this.bindMethods();

    this.state = {
      localConnection: null,
      remoteConnection: null,
      sendChannel: null,
      receiveChannel: null
    }
  }

  componentDidMount(){
  ///  this.createConnection();
  }


  onSendChannelStateChange() {
    const readyState = this.state.sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);
  }

  onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
  }

  gotDescription2(desc) {
    this.state.remoteConnection.setLocalDescription(desc);
    console.log(`Answer from remoteConnection\n${desc.sdp}`);
    this.state.localConnection.setRemoteDescription(desc);
  }

  gotDescription1(desc) {
    this.state.localConnection.setLocalDescription(desc);
    console.log(`Offer from localConnection\n${desc.sdp}`);
    this.state.remoteConnection.setRemoteDescription(desc);
    this.state.remoteConnection.createAnswer().then(
      this.gotDescription2,
      this.onCreateSessionDescriptionError
    );
  }


  onReceiveChannelStateChange() {
    const readyState = this.state.receiveChannel.readyState;
    console.log(`Receive channel state is: ${readyState}`);
  }

  onReceiveMessageCallback(event) {
    console.log('Received Message():' + event.data);
    dataChannelReceive.value = event.data;
  }

  receiveChannelCallback(event) {
    console.log('Receive Channel Callback()');
    this.state.receiveChannel = event.channel;
    this.state.receiveChannel.onmessage = this.onReceiveMessageCallback;
    this.state.receiveChannel.onopen = this.onReceiveChannelStateChange;
    this.state.receiveChannel.onclose = this.onReceiveChannelStateChange;
  }

  getOtherPc(pc) {
    return (pc === this.state.localConnection) ? this.state.remoteConnection : this.state.localConnection;
  }

  getName(pc) {
    return (pc === this.state.localConnection) ? 'localPeerConnection' : 'remotePeerConnection';
  }

  onIceCandidate(pc, event) {
    console.log("onIceCandidate()");
    this.getOtherPc(pc)
      .addIceCandidate(event.candidate)
      .then(
        () => this.onAddIceCandidateSuccess(pc),
        err => this.onAddIceCandidateError(pc, err)
      );
    console.log(`${this.getName(pc)} ICE candidate: ${event.candidate ? event.candidate.candidate : '(null)'}`);
  }

  onAddIceCandidateSuccess() {
    console.log('AddIceCandidate success.');
  }

  onAddIceCandidateError(error) {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
  }

  createConnection(){
    console.log("createConnection()");

    const servers = null;
    this.state.localConnection = new RTCPeerConnection(servers);
  //  window.location = this.state.localConnection;
    console.log('Created local peer connection object localConnection:' +
          this.state.localConnection);

    this.state.sendChannel = this.state.localConnection.createDataChannel('sendDataChannel');
    console.log('Created send data channel:' + this.state.sendChannel);

    this.state.localConnection.onicecandidate = e => {
      this.onIceCandidate(this.state.localConnection, e);
    };
    console.log('Created local peer connection object localConnection:' +
      this.state.localConnection);

    this.state.sendChannel.onopen = this.onSendChannelStateChange;
    this.state.sendChannel.onclose = this.onSendChannelStateChange;

    this.state.remoteConnection = new RTCPeerConnection(servers);
    console.log('1 - remoteConnection:' + this.state.remoteConnection);

    this.state.remoteConnection.onicecandidate = e => {
      this.onIceCandidate(this.state.remoteConnection, e);
    };
    this.state.remoteConnection.ondatachannel = this.receiveChannelCallback;

    this.state.localConnection.createOffer()
      .then(this.gotDescription1, this.onCreateSessionDescriptionError);

  }

  sendData(){

    const data = dataChannelSend.value;
    console.log('sending data:' + data);
    console.log('send data channel:' + this.state.sendChannel);
    this.state.sendChannel.send(data);

  }

  closeDataChannels(){
    console.log("closeDataChannels()");
    this.state.sendChannel.close();
    this.state.receiveChannel.close();
    this.state.localConnection.close();
    this.state.remoteConnection.close();
    this.state.localConnection = null;
    this.state.remoteConnection =  null;
  }


  bindMethods(){
    this.createConnection = this.createConnection.bind(this);
    this.sendData = this.sendData.bind(this);
    this.closeDataChannels = this.closeDataChannels.bind(this);
    this.onSendChannelStateChange = this.onSendChannelStateChange.bind(this);
    this.receiveChannelCallback = this.receiveChannelCallback.bind(this);
    this.onReceiveChannelStateChange = this.onReceiveChannelStateChange.bind(this);
    this.onReceiveMessageCallback = this.onReceiveMessageCallback.bind(this);
    this.gotDescription1 = this.gotDescription1.bind(this);
    this.gotDescription2 = this.gotDescription2.bind(this);
    this.onCreateSessionDescriptionError = this.onCreateSessionDescriptionError.bind(this);
    this.getOtherPc = this.getOtherPc.bind(this);
    this.getName = this.getName.bind(this);
    this.onIceCandidate = this.onIceCandidate.bind(this);
    this.onAddIceCandidateSuccess = this.onAddIceCandidateSuccess.bind(this);
    this.onAddIceCandidateError = this.onAddIceCandidateError.bind(this);
  }


  render(){

    return (
        <div id="container">

          <div id="buttons">
              <button id="startButton" onClick={this.createConnection.bind(this)}>Start Chat</button>
              <button id="sendButton" onClick={this.sendData.bind(this)}>Send Message</button>
              <button id="closeButton" onClick={this.closeDataChannels.bind(this)}>End Chat</button>
          </div>

          <div id="sendReceive">
              <div id="send">
                  <h2>Send</h2>
                  <textarea id="dataChannelSend"
                            placeholder="Press Start, enter some text, then press Send."></textarea>
              </div>
              <div id="receive">
                  <h2>Receive</h2>
                  <textarea id="dataChannelReceive"></textarea>
              </div>
          </div>

      </div>
    );
  }
}

RTCTextChat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(RTCTextChat);
