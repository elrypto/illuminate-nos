
import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { deleteProvider } from '../../actions';

const IPFS_BASE_URL = "https://ipfs.infura.io/ipfs/";

import ReactTable from "react-table";
import "react-table/react-table.css";


class LittleCard extends React.Component {

/*  // Parent component will pass in a handler to be called, if it is
  // a function, this will call it
  localDeleteHandler = e => {
       if (typeof this.props.onDeleteHandler === 'function') {
           this.props.onDeleteHandler(e.target.value);
       }
  }*/

  handleStartClick = e => {
    window.location = '/#/lessons';
  }

  handleDelete = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    console.log("in delete with id:" + e.target.id + " & service_name: " + e.target.name);
    dispatch(deleteProvider(e.target.id, e.target.name));
  }

  isOnline = neoAddr => {
    console.log(`checking if neo_addr [${neoAddr}] is online`);
    console.log(`checking in onlineList [${this.props.onlineList}] is online`);
    for (var i=0; i < this.props.onlineList.length; i++){
      if (this.props.onlineList[i]===neoAddr){
        return true;
      }
    }
    return false;
  }


  render() {
    //console.log(typeof this.props.online_now != 'undefined'))

    //console.log(`onlineList:${this.props.onlineList}`)

    let online = "";
    if (typeof this.props.online_now!='undefined'){
      if (this.props.online_now) {
        online = <p class="small pb-3 online-status">online</p>;
      } else {
        online = <p class="small pb-3 online-status">offline</p>;
      }
    }

    console.log(this.props.deleteable)
    let del = "";
    if ((typeof this.props.deleteable!='undefined') && this.props.deleteable){
      del = <button onClick={this.handleDelete} id={this.props.neo_addr} name={this.props.service_name}>DELETE!-{this.props.neo_addr}</button>
    }

  /*let delete = "";
    if (typeof this.props.deletable != 'undefined' && this.props.deletable){
      delete = <button>DEL</button>
    }*/

    /*
      old litttle card

       <div class="media text-muted pt-3">
          <img height="45" width="45" src={IPFS_BASE_URL + this.props.image_url} alt="" class="mr-2 rounded"/>
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark lh-125">{this.props.service_name}</strong>      
            {this.props.description}
          </p>
          {this.props.avg_rating}
          {online}
          {del}
        </div>

    */

    return(
    <React.Fragment>

          <ReactTable
            data={this.props.users}
            columns={[
              {
                Header: "Profile",
                columns: [
                  {
                    Header: 'Image',
                    accessor: 'ipfs_image_hash',
                    Cell: row => (
                      <div>
                        <img height="45" width="45" src={IPFS_BASE_URL + row.value} alt="" class="mr-2 rounded"/>
                      </div>
                    )
                  }/*,
                  {
                    Header: "Name",
                    accessor: "name"
                  }*/
                ]
              },
              {
                Header: "Service",
                columns: [
                  {
                    Header: "Service Name",
                    accessor: "service_name"
                  }/*,
                  {
                    Header: "Description",
                    accessor: "service_description"
                  }*/
                ]
              },
              {
                Header: "Interaction",
                columns: [
                  {
                    Header: "Neo Address",
                    accessor: "neo_addr"
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "Online now",
                    accessor: "neo_addr",
                    Cell: row => (
                      <span>
                        {this.isOnline(row.value) ?
                        <button onClick={this.handleStartClick}>Start</button>
                        : 'offline'
                        }
                      </span>
                    )
                  },
                  {
                    Header: "Interact",
                    id: "interact_now"
                  },
                  {
                    Header: "State",
                    accessor: "interaction_state"
                  }
                ]
              }
              
              /*
               Header: 'Status',
              accessor: 'status',
              Cell: row => (
              <span>
                <span style={{
                  color: row.value === 'relationship' ? '#ff2e00'
                  : row.value === 'complicated' ? '#ffbf00'
                  : '#57d500',
                  transition: 'all .3s ease'
                }}>
                &#x25cf;
              </span> {
                row.value === 'relationship' ? 'In a relationship'
                : row.value === 'complicated' ? `It's complicated`
                : 'Single'
              }
            </span>
            )*/
              
              
              /*,
              {
                Header: "Admin",
                columns: [
                  {
                    Header: "Rating",
                    accessor: "rating"
                  },
                  {
                    Header: "Delete",
                    accessor: "deleteable"
                  }
                ]
              }  */         
                 
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />

    </React.Fragment>
  );}
}

const mapStateToProps = state => {
  const {appStateTree} = state;

  return {
    appStateTree
  }
}

export default connect(mapStateToProps)(LittleCard)
