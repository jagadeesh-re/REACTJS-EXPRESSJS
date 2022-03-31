import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'

const tourStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Travel extends Component {
  state = {tour: '', status: tourStatus.loading}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: tourStatus.loading})
    const options = {
      method: 'GET',
    }
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const newList = data.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({tour: newList, status: tourStatus.success})
    } else this.setState({tour: '', status: tourStatus.failure})
  }

  getTourData = () => {
    const {status} = this.state

    switch (status) {
      case tourStatus.success:
        return this.renderTourList()
      case tourStatus.failure:
        return this.renderTourFailureView()
      case tourStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderTourList = () => {
    const {tour} = this.state

    return (
      <ul className="unordered-tour-list">
        {tour.map(eachItem => (
          <li key={eachItem.id} className="travel-container">
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="travel-image"
            />
            <h1 className="travel-name">{eachItem.name}</h1>
            <p className="travel-description">{eachItem.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderTourFailureView = () => <p>failure</p>

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {tour} = this.state

    return (
      <div className="travel-container">
        <div>{this.getTourData()}</div>
      </div>
    )
  }
}
export default Travel
