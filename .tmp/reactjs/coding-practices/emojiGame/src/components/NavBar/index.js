// Write your code here.

// Write your code here.
import './index.css'

const NavBar = props => {
  const {score, TopScore, win} = props
  return (
    <navbar>
      <div className="emoji-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="emoji logo"
        />
        <h1>Emoji Game</h1>
      </div>
      {win === 'pending' ? (
        <div className="score-container">
          <p className="score-paragraph">Score: {score}</p>
          <p>Top Score: {TopScore}</p>
        </div>
      ) : null}
    </navbar>
  )
}

export default NavBar
