import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { retrieveNeoAddr, getAppState, addProvider,
          startInProgress, endInProgress, errorMessage,
          formStartup, errorOnNeoAddrInUseForProvider  } from '../../actions';
import { PulseLoader } from 'react-spinners';


class ProviderForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
                    neo_addr: '',
                    service_name: '',
                    name: '',
                    service_description: '',
                    email: '',
                    category: 'Programming',
                    delivery_options: {
                      eMail: false,
                      Text: false,
                      Video: false
                    },
                    service_keywords:'',
                    price: 0,
                    ipfs_image_hash: null,
                    is_provider: true
                  }


    // bind methods
    this.captureFile = this.captureFile.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);
    this.handleSubmitForImage = this.handleSubmitForImage.bind(this);
    this.handleServiceNameChange = this.handleServiceNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleServiceDescChange = this.handleServiceDescChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCategorySelectChange = this.handleCategorySelectChange.bind(this);
    this.handleServiceCheckbox = this.handleServiceCheckbox.bind(this);
    this.handleServiceKeywordsChange = this.handleServiceKeywordsChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleProfileLinkChange = this.handleProfileLinkChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.callAddProvider = this.callAddProvider.bind(this);

  }

  componentDidMount(){
    const {dispatch, neo_addr} = this.props

    dispatch(formStartup());

    //wait a few seconds before we check
    //TODO: look at await/on asynch for this
    new Promise((resolve, reject) => {
      setTimeout(function(){
        console.log("checking for duplicate neo addr:" + neo_addr);
        dispatch(errorOnNeoAddrInUseForProvider(neo_addr));
        resolve();
      }, 3000)
    })
    .catch((err) => {
      this.props.dispatch(errorMessage(`Error: ${err.message} while checking for duplicate neo addresses`));
    });
  }


  /*
   * Note that the AppState may be stale (or updated by another client node)
   * so future solution will either refresh state and somehow guarentee write
   *
  */
  handleSave = e => {
    e.preventDefault()
    console.log("saveProfile()");
    let provider = this.state;
    console.log(JSON.stringify(provider));
    const { dispatch } = this.props;
    dispatch(addProvider(provider));
    //window.location = '/';
  }


  callAddProvider(){
    dispatch(addProvider(this.state));
  }

  captureFile (event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(startInProgress());
  /*  this.props.dispatch(startInProgress())
      .then (() => {

      })
      .then (() => this.props.dispatch(endInProgress()))*/

    new Promise((resolve, reject) => {
      console.log('promise - start in progress');
      const file = event.target.files[0];
      let reader = new window.FileReader();
      reader.onloadend = () => this.saveToIpfs(reader);
      reader.readAsArrayBuffer(file);
      resolve();
    })
    .then(() => {
      console.log("then() following file promise");
      //this.props.dispatch(endInProgress())
    }).catch((err) => {
      this.props.dispatch(errorMessage(`Error: ${err.message} while loading image file to ipfs`));
    });
  }

  saveToIpfs (reader) {
    let ipfsId;
    const buffer = Buffer.from(reader.result);

    let ipfsApi = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'});
    ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response);
        ipfsId = response[0].hash;
        console.log(ipfsId);
        this.props.dispatch(endInProgress());
        this.setState({ipfs_image_hash: ipfsId});
      }).catch((err) => {
        console.error(err);
      })
  }

  handleSubmitForImage (event) {
    event.preventDefault();
  }

  handleServiceNameChange(event){
    this.setState({service_name:event.target.value});
  }

  handleNameChange(event){
    this.setState({name:event.target.value});
  }

  handleServiceDescChange(event){
    this.setState({service_description:event.target.value});
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handleCategorySelectChange(event){
    this.setState({category:event.target.value})
  }

  handleServiceCheckbox(event){
    let obj = this.state.delivery_options
    obj[event.target.value] = event.target.checked // true or false
    this.setState({delivery_options: obj})
  }

  handleServiceKeywordsChange(event){
    this.setState({service_keywords:event.target.value});
  }

  handlePriceChange(event){
    this.setState({price:event.target.value});
  }

  handleProfileLinkChange(event){
    this.setState({profile_link_out:event.target.value});
  }


  render() {
    const {provider, inProgress, categories, neo_addr} = this.props;

    return(
    <React.Fragment>

        <section class="jumbotron text-center">
          <div class="container">
            <h2 class="jumbotron-heading">New Provider Registration</h2>
            <p class="lead text-muted">Your free registration as an illuminate provider will allow
            you to interact (teach, discuss and other services) other users and you can earn cryptocurrency.
            Just fill out the form and your profile should be findable within the next few hours.
            </p>

            <form>
              <div class="form-group lefty">
                <label for="this">{this.props.neo_addr}</label>
                <label for="lableNeoAddr"> (Detected Neo Address)</label>
              </div>
              <div class="form-group lefty">
                <label for="inputServiceName">What is the name of your service. Think of it like a store or company name.</label>
                <input type="text" class="form-control" id="inputNeoAddr" placeholder="Neo Development" onChange={this.handleServiceNameChange} value={this.state.service_name} />
              </div>
              <div class="form-group lefty">
                <label for="inputName">What do you want people to call you?</label>
                <input type="text" class="form-control" id="name" placeholder="Morpheus" onChange={this.handleNameChange} value={this.state.name}/>
              </div>
              <div class="form-group lefty">
                <label for="inputServiceDescription">Provide a few sentences around why someone should want a lesson or interaction from you and why you are qualified to teach them.</label>
                <textarea class="form-control" rows="3" id="inputServiceDescription" value="I have 5 years of NEO and 8 years of blockchain experience. I would love to help you solve you technical issues." onChange={this.handleServiceDescChange} value={this.state.service_description} />
              </div>
             <div class="form-group lefty">
                <label for="inputEmail">Email address. You may get notified when people are interested in your interacting witth you.</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailChange} value={this.state.email}/>
                <small id="emailHelp" class="form-text text-muted">We will contact you with account related information and notifications.</small>
              </div>
              <div class="form-group lefty">
                <label for="service_categories">Main Service You Provide</label>
                <select class="form-control" id="service_categories" value={this.state.category} onChange={this.handleCategorySelectChange}>
                  {categories.map(function(cat, i){
                      return <option>{cat}</option>;
                   })}
                </select>
              </div>
              <div class="form-group lefty">
                <label for="service_keywords">Some keywords that narrows down for users what your offer</label>
                <input type="text" class="form-control" id="service_keywords" value={this.state.service_keywords} onChange={this.handleServiceKeywordsChange} value={this.state.service_keywords} />
              </div>
              <div class="form-group lefty">
              <label for="checkboxGroup">How will users be able to interact with your service</label>
              <br/>
              <label>
                <input
                  type="checkbox"
                  name="checkboxGroup"
                  value='eMail'
                  checked={this.state.delivery_options['eMail']}
                  onChange={this.handleServiceCheckbox}/>
                eMail
              </label>
              <br/>
              <label>
                <input
                  type="checkbox"
                  name="checkboxGroup"
                  value='Text'
                  checked={this.state.delivery_options['Text']}
                  onChange={this.handleServiceCheckbox}/>
                Text
              </label>
              <label>
                <input
                  type="checkbox"
                  name="checkboxGroup"
                  value='Video'
                  checked={this.state.delivery_options['Video']}
                  onChange={this.handleServiceCheckbox}/>
                Video
              </label>
              <hr/>
              </div>
              <div class="form-group lefty">
                <label for="price">Price in NeoGAS per Interaction (you can change this at any time)</label>
                <input type="text" class="form-control" id="price" onChange={this.handlePriceChange} value={this.state.price} />
              </div>
                  <div class="form-group lefty">
                <label for="linkToExternalProfile">Link to Your Profile:</label>
                <input type="text" class="form-control" id="linkToExternalProfile" placeholder="https://linkedin.com/in/myname" onChange={this.handleProfileLinkChange} value={this.state.profile_link_out}/>
              </div>

              <div class="form-group lefty">
                <label for="profileImageInputFile">Profile image. This is the first thing people will notice about your service. Optional, but recommended.</label>

                <div>
                  <form id='captureMedia' onSubmit={this.handleSubmitForImage}>
                    <input type='file' onChange={this.captureFile} />
                  </form>
                  <div>

                  <a id="ipfs_hash" target='_blank'
                    href={'https://ipfs.infura.io/ipfs/' + this.ipfs_image_hash}>
                    Image(IPFS Link): {this.state.ipfs_image_hash}
                  </a>


                    <PulseLoader
                      sizeUnit={"px"}
                      size={10}
                      color={'#59a5db'}
                      loading={this.props.inProgress}  />

                  </div>
                </div>

              </div>

              <button type="submit" class="btn btn-primary" onClick={this.handleSave}>Save Profile</button>
              <a href="#" class="btn btn-secondary my-2">Cancel</a>
            </form>

          </div>
        </section>


    </React.Fragment>
  );
   }
  }

  const mapStateToProps = state => {
    const { provider, appStateTree, inProgress, neo_addr } = state
    const categories = appStateTree.categories

    return {
      provider, appStateTree, categories, inProgress, neo_addr
    }
  }

export default connect(mapStateToProps)(ProviderForm)
