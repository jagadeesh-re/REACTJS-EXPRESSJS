// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {eachItem} = props
  const modifiedData = {
    name: eachItem.name,
    id: eachItem.id,
    teamImageUrl: eachItem.team_image_url,
  }
  const {name, id, teamImageUrl} = modifiedData

  return (
    <Link to={`/team-matches/${id}`}>
      <li className="list-item">
        <img src={teamImageUrl} alt={name} className="match-image" />
        <p className="math-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
