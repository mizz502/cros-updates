import React, { Component } from "react"
import MuiDownshift from "mui-downshift"
import PropTypes from "prop-types"
import { StaticQuery, graphql, navigate } from "gatsby"

class Search extends Component {
  static defaultProps = {
    blurOnSelect: false,
  }

  state = {
    filteredItems: this.props.data.allCrosUpdatesJson.nodes,
  }


  render() {
    const deviceNames = this.props.data.allCrosUpdatesJson.nodes.sort((a, b) => a.label.localeCompare(b.label))
    const boardNames = this.props.data.allCrosUpdatesJson.nodes.map( (device) => {
      return {
        value: device.value,
        label: "board: " + device.value,
      } 
    })

    const items = deviceNames.concat(boardNames)
    const handleStateChange = changes => {

      if (typeof changes.inputValue === "string") {
        const filteredItems = items.filter(item =>
          item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
        )
        this.setState({ filteredItems })
      }

      if (this.input && this.props.blurOnSelect) {
        this.input.blur()
      }

      if (changes.type === "__autocomplete_click_item__" || changes.type === "__autocomplete_keydown_enter__" || changes.type === 6 || changes.type === 7) {
        navigate("/device/" + changes.selectedItem.value)
      }
    }

    return (
      <MuiDownshift
        items={this.state.filteredItems}
        onStateChange={handleStateChange}
        variant="filled"
        {...this.props}
        inputRef={node => {
          this.input = node
        }}
        getInputProps={() => ({
          label: 'Enter a Chrome OS Device or Board',
        })}
      />
    )
  }
}

Search.propTypes = {
  blurOnSelect: PropTypes.bool,
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allCrosUpdatesJson(filter: { Brand_names: { ne: null } }) {
          nodes {
            value: Codename
            label: Brand_names
          }
        }
      }
    `}
    render={data => <Search data={data} {...props} />}
  />
)
