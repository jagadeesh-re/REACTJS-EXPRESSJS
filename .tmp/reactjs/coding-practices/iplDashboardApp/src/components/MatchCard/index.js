// Write your code her
// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachItem} = props
  const modifiedeachItem = {
    result: eachItem.result,
    umpires: eachItem.umpires,
    manOfMatch: eachItem.man_of_the_match,
    id: eachItem.id,
    date: eachItem.date,
    venue: eachItem.venue,
    competingTeam: eachItem.competing_team,
    competingTeamLogo: eachItem.competing_team_logo,
    firstInnings: eachItem.first_innings,
    secondInnings: eachItem.second_innings,
    matchStatus: eachItem.match_status,
  }
  return (
    <li className="recent-list">
      <img
        src={modifiedeachItem.competingTeamLogo}
        alt={`competing team ${modifiedeachItem.competingTeam}`}
        className="recent-list-image"
      />
      <p>{modifiedeachItem.competingTeam}</p>
      <p>{modifiedeachItem.result}</p>
      <p className={modifiedeachItem.matchStatus === 'Lost' ? 'loss' : 'won'}>
        {modifiedeachItem.matchStatus}
      </p>
    </li>
  )
}
export default MatchCard
