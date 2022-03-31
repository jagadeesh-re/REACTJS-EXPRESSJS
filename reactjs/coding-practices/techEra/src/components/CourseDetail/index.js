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

class CourseDetail extends Component {
  state = {courseDetailList: '', status: courseStatus.loading}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: courseStatus.loading})
    const options = {
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const newList = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({courseDetailList: newList, status: courseStatus.success})
    } else this.setState({courseDetailList: '', status: courseStatus.failure})
  }

  getcourseDetailListData = () => {
    const {status} = this.state

    switch (status) {
      case courseStatus.success:
        return this.rendercourseDetailListList()
      case courseStatus.failure:
        return this.rendercourseDetailListFailureView()
      case courseStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  rendercourseDetailListList = () => {
    const {courseDetailList} = this.state
    console.log(courseDetailList)

    return (
      <div className="course-detail-container">
        <ul className="unordered-courseDetailList-list">
          <li key={courseDetailList.id} className="course-detail-list">
            <img
              src={courseDetailList.imageUrl}
              alt={courseDetailList.name}
              className="course-detail-image"
            />
            <div>
              <h1 className="course-detail-heading">{courseDetailList.name}</h1>
              <p className="course-detail-paragraph">
                {courseDetailList.description}
              </p>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  rendercourseDetailListFailureView = () => (
    <Failure retryApiUrl={this.retryApiUrl} />
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  retryApiUrl = () => this.getDetails()

  render() {
    const {courseDetailList} = this.state

    return (
      <div className="travel-container">
        <Header />
        <div className="course">{this.getcourseDetailListData()}</div>
      </div>
    )
  }
}
export default CourseDetail
