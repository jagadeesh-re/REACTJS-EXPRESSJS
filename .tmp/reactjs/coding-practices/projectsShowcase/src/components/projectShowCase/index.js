import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'

const ProjectStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Projects extends Component {
  state = {projects: '', status: ProjectStatus.loading, category: 'ALL'}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: ProjectStatus.loading})
    const options = {
      method: 'GET',
    }
    const {category} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const newList = data.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({projects: newList, status: ProjectStatus.success})
    } else this.setState({projects: '', status: ProjectStatus.failure})
  }

  getprojectsData = () => {
    const {status} = this.state

    switch (status) {
      case ProjectStatus.success:
        return this.renderprojectsList()
      case ProjectStatus.failure:
        return this.renderprojectsFailureView()
      case ProjectStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderprojectsList = () => {
    const {projects} = this.state

    return (
      <ul className="unordered-projects-list">
        {projects.map(eachItem => (
          <li key={eachItem.id} className="Projects-container">
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="Projects-image"
            />
            <p className="Projects-name">{eachItem.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderprojectsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  change = event => {
    this.setState({category: event.target.value}, this.getDetails)
  }

  render() {
    const {projects, category} = this.state

    return (
      <div className="Projects-container">
        <Header />
        <select value={category} onChange={this.change}>
          {categoriesList.map(eachItem => (
            <option key={eachItem.id} value={eachItem.id}>
              {eachItem.displayText}
            </option>
          ))}
        </select>

        <div>{this.getprojectsData()}</div>
      </div>
    )
  }
}
export default Projects
