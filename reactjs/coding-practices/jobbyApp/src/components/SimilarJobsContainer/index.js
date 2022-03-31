import '../JobCard/index.css'
import './index.css'
import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobsContainer = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem

  return (
    <li className="job-list-container similar-list">
      <div className="company-top-section">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
      <h1 className="job-description-heading">Description</h1>
      <p className="job-description-paragraph">{jobDescription}</p>
    </li>
  )
}
export default SimilarJobsContainer
