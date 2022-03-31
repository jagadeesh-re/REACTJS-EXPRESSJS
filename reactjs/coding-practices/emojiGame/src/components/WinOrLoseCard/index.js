// Write your code here.

// Write your code here.
import './index.css'

const WinOrLoseCard = props => {
  const {url, win, score, playGame} = props
  const message = win ? 'You Won' : 'You Lose'
  const reviewScore = win ? 'Best Score' : 'Score'

  const playAgain = () => {
    playGame()
  }

  return (
    <div className="winorlose">
      <div className="score-item-container">
        <h1>{message}</h1>
        <p>{reviewScore}</p>
        <p className="best-score-paragraph">{score}/12</p>

        <button type="button" className="button-play" onClick={playAgain}>
          Play Again
        </button>
      </div>

      <div className="image">
        <img src={url} alt="win or lose" />
      </div>
    </div>
  )
}
export default WinOrLoseCard
