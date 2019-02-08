
import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


import ReactTable from "react-table";
import "react-table/react-table.css";


class PurchaseTable extends React.Component {

  render() {

    return(
    <React.Fragment>

          <ReactTable
            data={this.props.purchases}
            columns={[
              {
                Header: "Parties",
                columns: [
                  {
                    Header: 'To',
                    accessor: "toAddr"
                  },
                  {
                    Header: "From",
                    accessor: "fromAddr"
                  }
                ]
              },
              {
                Header: "Transaction",
                columns: [
                  {
                    Header: "Current State",
                    accessor: "interactionState"
                  },
                  {
                    Header: "Amount",
                    accessor: "amt"
                  },
                  {
                    Header: "BlockChain Tx Id",
                    accessor: "trxId"
                  },
                  {
                    Header: "Original Purchase Timestamp",
                    accessor: "timeStamp"
                  }
                ]
              }/*,
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



export default PurchaseTable
