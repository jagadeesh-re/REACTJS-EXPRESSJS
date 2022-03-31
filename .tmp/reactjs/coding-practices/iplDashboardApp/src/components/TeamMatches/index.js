// Write your code here
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard/index'
import LatestMatch from '../LatestMatch/index'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    cricketData: {},
    isData: false,
  }

  componentDidMount() {
    this.getCricketItemData()
  }

  getCricketItemData = async () => {
    const {match} = this.props
    const {params} = match

    const {id} = params
    console.log(id)

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await response.json()
    console.log(data)
    const updatedData = {
      bannerUrl: data.team_banner_url,
      latestMatches: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    this.setState({cricketData: updatedData, isData: true})
  }

  render() {
    const {cricketData, isData} = this.state
    const {bannerUrl, latestMatches, recentMatches} = cricketData
    console.log(cricketData)

    return (
      <div className="TeamMatches-container">
        {isData ? (
          <div className="team-matches-inner-container">
            <div className="banner-container">
              <img src={bannerUrl} alt="team banner" className="banner-logo" />
            </div>
            <p className="latest-match">Latest Matches</p>
            <LatestMatch latestMatches={latestMatches} />
            <ul className="recentmatch-list">
              {recentMatches.map(eachItem => (
                <MatchCard eachItem={eachItem} key={eachItem.id} />
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
export default TeamMatches
