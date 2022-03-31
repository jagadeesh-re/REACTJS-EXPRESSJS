import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Failure from '../Failure/index'
import Header from '../Header/index'

const courseStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Course extends Component {
  state = {tour: '', status: courseStatus.loading}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: courseStatus.loading})
    const options = {
      method: 'GET',
    }
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const newList = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({tour: newList, status: courseStatus.success})
    } else this.setState({tour: '', status: courseStatus.failure})
  }

  getTourData = () => {
    const {status} = this.state

    switch (status) {
      case courseStatus.success:
        return this.renderTourList()
      case courseStatus.failure:
        return this.renderTourFailureView()
      case courseStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderTourList = () => {
    const {tour} = this.state

    return (
      <div className="courses-container">
        <h1>Courses</h1>
        <ul className="unordered-tour-list">
          {tour.map(eachItem => (
            <Link
              to={`/courses/${eachItem.id}`}
              className="link"
              key={eachItem.id}
            >
              <li className="course-list">
                <img
                  src={eachItem.logoUrl}
                  alt={eachItem.name}
                  className="course-image"
                />
                <p>{eachItem.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderTourFailureView = () => <Failure retryApiUrl={this.retryApiUrl} />

  retryApiUrl = () => this.getDetails()

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {tour} = this.state

    return (
      <div className="travel-container">
        <Header />
        <div className="course">{this.getTourData()}</div>
      </div>
    )
  }
}
export default Course
