import {Component} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

class Capitals extends Component {
  state = {selectedId: 'NEW_DELHI', country: 'India'}

  change = event => {
    const country = countryAndCapitalsList.filter(
      each => each.id === event.target.value,
    )

    this.setState({
      selectedId: country.id,
      country: country[0].country,
    })
  }

  render() {
    const {selectedId, country} = this.state

    return (
      <div className="container">
        <div className="inner-container">
          <h1 className="heading">Countries and Capitals</h1>
          <div className="dropdown">
            <select onChange={this.change}>
              {countryAndCapitalsList.map(eachItem =>
                selectedId === eachItem.id ? (
                  <option value={eachItem.id} key={eachItem.id} selected>
                    {eachItem.capitalDisplayText}
                  </option>
                ) : (
                  <option value={eachItem.id} key={eachItem.id}>
                    {eachItem.capitalDisplayText}
                  </option>
                ),
              )}
            </select>
            <p>is capital of which Country?</p>
          </div>
          <h1>{country}</h1>
        </div>
      </div>
    )
  }
}
export default Capitals
