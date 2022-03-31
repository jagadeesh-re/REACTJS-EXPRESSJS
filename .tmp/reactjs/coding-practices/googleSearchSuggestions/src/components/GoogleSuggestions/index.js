import {Component} from 'react'
import './index.css'
import SuggestionItem from '../SuggestionItem/index'

class GoogleSuggestions extends Component {
  state = {searchInput: ''}

  change = event => {
    this.setState({searchInput: event.target.value})
  }

  clickFunction = text => this.setState({searchInput: text})

  render() {
    const {searchInput} = this.state
    const {suggestionsList} = this.props
    const result = suggestionsList.filter(eachItem =>
      eachItem.suggestion.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="container">
        <div className="innerContainer">
          <img
            className="google"
            src="https://assets.ccbp.in/frontend/react-js/google-logo.png "
            alt="google logo"
          />
          <div className="search-container">
            <div className="searchBar">
              <img
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
                alt="search icon"
              />
              <input
                type="search"
                className="searchInput"
                placeholder="Search Google"
                onChange={this.change}
                value={searchInput}
              />
            </div>
            <ul className="unordered-list">
              {result.map(eachItem => (
                <SuggestionItem
                  eachItem={eachItem}
                  key={eachItem.id}
                  clickFunction={this.clickFunction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default GoogleSuggestions
