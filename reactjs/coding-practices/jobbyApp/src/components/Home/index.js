import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/index'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-inner-container">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-paragraph">
              Millions of people are searching for
              jobs,salary,information,company reviews. Find the job that fits
              your abilities and potential.
            </p>
            <Link to="/jobs" className="jobs-link">
              <button type="button" className="find-jobs-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}
export default Home
