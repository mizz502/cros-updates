import React from "react"
import { Link, graphql } from "gatsby"
import MuiDownshift from 'mui-downshift'

import TableView from '../components/TableView'

export const query = graphql`
  query {
    allCrosUpdates3Json {
      nodes {
        value: name
      }
    }
  }
`

class Index extends React.Component {
  render() {
    var data = this.props.data.allCrosUpdates3Json.nodes
    console.log(data)
    return (
      <>
        <MuiDownshift  data={data} />
      </>
    )
  }
}

export default Index
