import './index.css'

const NavBar = props => {
  const {score, seconds} = props
  console.log(score)

  return (
    <nav className="top-navbar">
      <div className="content">
        <ul className="unordered-list-top">
          <li className="navList">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="website-logo"
            />
          </li>

          <li className="score-content">
            <p className="score-paragraph">
              Score: <span>{score}</span>
            </p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer-image"
            />
            <p className="stop-counter">{seconds} sec</p>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar
