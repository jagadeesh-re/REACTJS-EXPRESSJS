// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import TeamCard from '../TeamCard/index'

class Home extends Component {
  state = {iplData: '', isDataFetched: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const response = await fetch(`https://apis.ccbp.in/ipl`)
      const data = await response.json()
      const {teams} = data
      this.setState({iplData: teams, isDataFetched: true})
    } catch (error) {
      console.log('no data')
    }
  }

  render() {
    const {iplData, isDataFetched} = this.state

    return (
      <div className="home-container">
        <div className="ipl-dashboard-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo-image"
          />
          <h1 className="dashboard-heading">IPL Dashboard</h1>
        </div>
        {isDataFetched ? (
          <div>
            <ul className="unordered-list">
              {iplData.map(eachItem => (
                <TeamCard key={eachItem.id} eachItem={eachItem} />
              ))}
            </ul>
          </div>
        ) : (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        )}
      </div>
    )
  }
}
export default Home
