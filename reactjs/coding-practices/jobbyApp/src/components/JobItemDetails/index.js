import './index.css'

import Loader from 'react-loader-spinner'
import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {FiExternalLink} from 'react-icons/fi'
import SimilarJobsContainer from '../SimilarJobsContainer/index'
import Header from '../Header/index'

const eachJobStatusDetails = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    eachJobDetails: '',
    eachJobStatus: eachJobStatusDetails.loading,
    skills: '',
    similarJobs: '',
    lifeAtCompany: '',
  }

  componentDidMount() {
    this.getEachJobs()
  }

  getEachJobs = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({eachJobStatus: eachJobStatusDetails.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
      const eachJobsList = {
        companyLogoUrl: data.job_details.company_logo_url,
        websiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const newSkills = data.job_details.skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))

      const newSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const life = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      this.setState({
        eachJobDetails: eachJobsList,
        eachJobStatus: eachJobStatusDetails.success,
        skills: newSkills,
        similarJobs: newSimilarJobs,
        lifeAtCompany: life,
      })
    } else {
      this.setState({
        eachJobDetails: '',
        eachJobStatus: eachJobStatusDetails.failure,
      })
    }
  }

  showEachJobDetails = () => {
    const {eachJobStatus} = this.state
    switch (eachJobStatus) {
      case eachJobStatusDetails.loading:
        return this.eachJobLoader()
      case eachJobStatusDetails.success:
        return this.eachShowJobs()
      case eachJobStatusDetails.failure:
        return this.eachJobFailure()

      default:
        return null
    }
  }

  eachJobLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  eachShowJobs = () => {
    const {eachJobDetails, skills, similarJobs, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      websiteUrl,
    } = eachJobDetails

    return (
      <>
        <div className="job-list-container">
          <div className="company-top-section">
            <div className="company-logo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
            </div>
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-rating-react-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-details">
            <div className="job-location-details">
              <MdLocationOn className="job-location-details-icons" />
              <p className="job-location-paragraph">{location}</p>
              <BsFillBriefcaseFill className="job-location-details-icons" />
              <p className="job-employmentType-paragraph">{employmentType}</p>
            </div>
            <p className="package-paragraph">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-description-main-container">
            <h1 className="job-description-heading">Description</h1>
            <a href={websiteUrl}>
              Visit
              <FiExternalLink />
            </a>
          </div>
          <p className="job-description-paragraph">{jobDescription}</p>
          <h1>Skills</h1>
          <div>
            <ul className="skills">
              {skills.map(eachItem => (
                <li className="skill-item" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skill-logo"
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>

        <div>
          <h1 className="similar-job-heading">Similar Jobs</h1>

          <ul className="similarjoblist">
            {similarJobs.map(eachItem => (
              <SimilarJobsContainer key={eachItem.id} eachItem={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  eachJobFailure = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="heading-job-failure">Oops! Something Went Wrong</h1>
      <p className="paragraph-job-failure">
        we cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-job-button"
        onClick={this.getEachJobs}
      >
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.showEachJobDetails()}</div>
      </>
    )
  }
}
export default JobItemDetails
