import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
//const ipfsAPI = require('ipfs-api')
import { PropagateLoader } from 'react-spinners';


class IPFSFileUploader extends React.Component {
  constructor () {
    super()
    this.state = {
      added_file_hash: null,
      ipfsApi: null,
      prog: null,
      loading: false
    }

    //  this.ipfsApi = ipfsAPI('localhost', '5001')
    this.ipfsApi = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'});

    // bind methods
    this.captureFile = this.captureFile.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  captureFile (event) {
    this.setState({loading:true});
    //event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.onloadend = () => this.saveToIpfs(reader);
    reader.readAsArrayBuffer(file);
  }

  saveToIpfs (reader) {
    let ipfsId;
    const buffer = Buffer.from(reader.result);


    this.ipfsApi.add(buffer, { progress: (this.state.prog) => console.log(`received: ${this.state.prog}`) })
      .then((response) => {
        console.log(response);
        ipfsId = response[0].hash;
        console.log(ipfsId);
        this.setState({loading:false});
        this.setState({added_file_hash: ipfsId});
      }).catch((err) => {
        console.error(err);
      })
  }

  handleSubmit (event) {
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <form id='captureMedia' onSubmit={this.handleSubmit}>
          <input type='file' onChange={this.captureFile} />
        </form>
        <div>
          <a id="ipfs_hash" target='_blank'
            href={'https://ipfs.infura.io/ipfs/' + this.state.added_file_hash}>
            IPFSHash: {this.state.added_file_hash}
           </a>
            <PropagateLoader
                sizeUnit={"px"}
                size={15}
                color={'#59a5db'}
                loading={this.state.loading} />

        </div>
      </div>
    )
  }
}
module.exports = IPFSFileUploader
