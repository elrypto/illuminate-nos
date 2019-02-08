import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {
};

class RTCVideoChat extends React.Component {
//https://illuminate-web-1.herokuapp.com/

  componentDidMount(){
    console.log("didMount()");
    var receiver = document.getElementById('video-frame-1').contentWindow;
  }

  render(){
   let url = "https://illuminate-web-1.herokuapp.com";


    return (
      <div>
        <p>W-I-D-E-O</p>

        <iframe id="video-frame-1"
          src={url}
          width="800" height="300">
        </iframe>

      </div>
    );
  }
}

RTCVideoChat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(RTCVideoChat);


/*

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>iframe Window</title>
    <style>
        body {
            background-color: #D53C2F;
            color: white;
        }
    </style>
</head>
<body>

    <h1>Hello there, i'm an iframe</h1>
    <p>Send Message: <button id="message_button">Hi parent</button></p>
    <p>Got Message:</p>
    <div id="results"></div>

    <script>
        // addEventListener support for IE8
        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }

        // Send a message to the parent
        var sendMessage = function (msg) {
            // Make sure you are sending a string, and to stringify JSON
            window.parent.postMessage(msg, '*');
        };

        var results = document.getElementById('results'),
            messageButton = document.getElementById('message_button');

        // Listen to messages from parent window
        bindEvent(window, 'message', function (e) {
            results.innerHTML = e.data;
        });

        // Send random message data on every button click
        bindEvent(messageButton, 'click', function (e) {
            var random = Math.random();
            sendMessage('' + random);
        });
    </script>
</body>
</html>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Parent Window</title>
</head>
<body>

    <h1>Parent Window</h1>
    <p>Send Message: <button id="message_button">Hi there iframe</button></p>
    <p>Got Message:</p>
    <div id="results"></div>
    <br/>

    <script>
        // addEventListener support for IE8
        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }

        var iframeSource = 'https://gist.github.com/pbojinov/8965299/raw/fadf2c4058b6481646e7244994c1890f2ad81b60/iframe.html';

        // Create the iframe
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', iframeSource);
        iframe.setAttribute('id', 'the_iframe');
        iframe.style.width = 450 + 'px';
        iframe.style.height = 200 + 'px';
        document.body.appendChild(iframe);

        // Send a message to the child iframe
        var iframeEl = document.getElementById('the_iframe'),
            messageButton = document.getElementById('message_button'),
            results = document.getElementById('results');


        // Send a message to the child iframe
        var sendMessage = function(msg) {
            // Make sure you are sending a string, and to stringify JSON
            iframeEl.contentWindow.postMessage(msg, '*');
        };

        // Send random messge data on every button click
        bindEvent(messageButton, 'click', function (e) {
            var random = Math.random();
            sendMessage('' + random);
        });

        // Listen to message from child window
        bindEvent(window, 'message', function (e) {
            results.innerHTML = e.data;
        });
    </script>
</body>
</html>





*/
