import './index.css'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import JobCard from '../JobCard/index'

const profileStatusDetails = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

const jobsStatusDetails = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profile: '',
    profileStatus: profileStatusDetails.loading,
    employementType: [],
    minimumPackage: '',
    search: '',
    jobStatus: jobsStatusDetails.loading,
    jobsDetails: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobStatus: jobsStatusDetails.loading})

    const {employementType, minimumPackage, search} = this.state
    const employementTypeString = employementType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employementTypeString}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      if (data.jobs[0] !== undefined) {
        const jobsList = data.jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          title: eachItem.title,
        }))

        this.setState({
          jobsDetails: jobsList,
          jobStatus: jobsStatusDetails.success,
        })
      } else {
        this.setState({
          jobsDetails: '',
          jobStatus: jobsStatusDetails.empty,
        })
      }
    } else {
      this.setState({
        jobsDetails: '',
        jobStatus: jobsStatusDetails.failure,
      })
    }
  }

  getProfile = async () => {
    this.setState({profileStatus: profileStatusDetails.loading})
    const jwtToken = Cookies.get('jwt_token')
    const profileApi = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApi, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const newProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profile: newProfile,
        profileStatus: profileStatusDetails.success,
      })
    } else {
      this.setState({profile: '', profileStatus: profileStatusDetails.failure})
    }
  }

  showProfileDetails = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileStatusDetails.loading:
        return this.profileLoader()
      case profileStatusDetails.success:
        return this.showProfile()
      case profileStatusDetails.failure:
        return this.profileFailure()
      default:
        return null
    }
  }

  profileLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  profileFailure = () => (
    <div>
      <button
        type="button"
        className="retry-profile-button"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  showProfile = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-paragraph">{shortBio}</p>
      </div>
    )
  }

  showJobsDetails = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case jobsStatusDetails.loading:
        return this.jobLoader()
      case jobsStatusDetails.success:
        return this.showJobs()
      case jobsStatusDetails.failure:
        return this.jobFailure()
      case jobsStatusDetails.empty:
        return this.jobEmpty()
      default:
        return null
    }
  }

  jobLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  jobFailure = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="heading-job-failure">Oops! Something Went Wrong</h1>
      <p className="paragraph-job-failure">
        we cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-job-button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  jobEmpty = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1 className="heading-job-failure">No Jobs Found</h1>
      <p className="paragraph-job-failure">
        we could not find any jobs. Try other filters.
      </p>
    </div>
  )

  showJobs = () => {
    const {jobsDetails} = this.state

    return (
      <div className="jobs-container">
        <ul className="show-jobs">
          {jobsDetails.map(eachItem => (
            <JobCard key={eachItem.id} eachItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  changeCheckbox = event => {
    const {employementType} = this.state
    let newemployeeList
    if (event.target.checked) {
      newemployeeList = employementType.map(each => each)
      newemployeeList.push(event.target.id)
    } else {
      newemployeeList = employementType.filter(each => each !== event.target.id)
    }
    this.setState({employementType: newemployeeList}, this.getJobs)
  }

  changeRadio = event => {
    if (event.target.checked) {
      this.setState({minimumPackage: event.target.id}, this.getJobs)
    }
  }

  changeSearch = event => this.setState({search: event.target.value})

  fetchDetails = () => this.getJobs()

  render() {
    const {employementType, minimumPackage, search, jobsDetails} = this.state
    console.log(employementType.join(','))
    console.log(search)
    console.log(minimumPackage)

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="side-container">
            <div className="profile-section-details">
              {this.showProfileDetails()}
            </div>
            <hr />
            <div className="employment-type-section">
              <h1 className="type-heading">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachItem => (
                  <li
                    key={eachItem.employmentTypeId}
                    onChange={this.changeCheckbox}
                  >
                    <div className="checkbox-holder">
                      <input
                        type="checkbox"
                        id={eachItem.employmentTypeId}
                        className="checkbox"
                      />
                      <label
                        htmlFor={eachItem.employmentTypeId}
                        className="type-label"
                      >
                        {eachItem.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr />

            <div className="employment-type-section">
              <h1 className="type-heading">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachItem => (
                  <li key={eachItem.salaryRangeId} onChange={this.changeRadio}>
                    <div className="checkbox-holder">
                      <input
                        type="radio"
                        id={eachItem.salaryRangeId}
                        className="checkbox"
                        name="salary"
                      />
                      <label
                        htmlFor={eachItem.salaryRangeId}
                        className="type-label"
                      >
                        {eachItem.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.changeSearch}
                value={search}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-icon"
                onClick={this.fetchDetails}
              >
                <BsSearch />
              </button>
            </div>
            {this.showJobsDetails()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
