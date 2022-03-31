import {Component} from 'react'
import './index.css'
import DestinationItem from '../DestinationItem/index'

class DestinationSearch extends Component {
  state = {searchInput: ''}

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    const {destinationsList} = this.props
    const searchResults = destinationsList.filter(each =>
      each.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="container">
        <div>
          <div className="headingSection">
            <h1>Destination Search</h1>
            <input
              type="search"
              placeholder="search"
              onChange={this.onSearch}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
              alt="search icon"
              className="search-icon"
            />
          </div>
          <ul className="unordered-list">
            {searchResults.map(eachItem => (
              <DestinationItem key={eachItem.id} item={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
DestinationSearch.defaultProps = {
  destinationList: '',
}

export default DestinationSearch
