// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatches} = props
  const modifiedLatestMatches = {
    result: latestMatches.result,
    umpires: latestMatches.umpires,
    manOfMatch: latestMatches.man_of_the_match,
    id: latestMatches.id,
    date: latestMatches.date,
    venue: latestMatches.venue,
    competingTeam: latestMatches.competing_team,
    competingTeamLogo: latestMatches.competing_team_logo,
    firstInnings: latestMatches.first_innings,
    secondInnings: latestMatches.second_innings,
    matchStatus: latestMatches.match_status,
  }
  return (
    <div className="latestMatch-details">
      <div>
        <p>{modifiedLatestMatches.competingTeam}</p>
        <p>{modifiedLatestMatches.date}</p>
        <p>{modifiedLatestMatches.venue}</p>
        <p>{modifiedLatestMatches.result}</p>
      </div>
      <div>
        <img
          src={modifiedLatestMatches.competingTeamLogo}
          alt={`latest match ${modifiedLatestMatches.competingTeam}`}
          className="competing-image-logo"
        />
      </div>
      <div>
        <h1>First Innings</h1>
        <p>{modifiedLatestMatches.firstInnings}</p>
        <h1>Second Innings</h1>
        <p>{modifiedLatestMatches.secondInnings}</p>
        <h1>Man Of the Match</h1>
        <p>{modifiedLatestMatches.manOfMatch}</p>
        <h1>umpires</h1>
        <p>{modifiedLatestMatches.umpires}</p>
      </div>
    </div>
  )
}
export default LatestMatch
