/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import './index.css'
import NavBar from '../NavBar/index'
import EmojiCard from '../EmojiCard/index'
import WinOrLoseCard from '../WinOrLoseCard/index'

class EmojiGame extends Component {
  state = {score: 0, TopScore: 0, id: [], win: 'pending'}

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  playGame = () => {
    const {score, TopScore} = this.state

    if (score === 12)
      this.setState({score: 0, TopScore: 12, id: [], win: 'pending'})
    else {
      if (score >= TopScore) {
        this.setState(prevState => ({
          score: 0,
          TopScore: prevState.score,
          id: [],
          win: 'pending',
        }))
      }
      if (score < TopScore) {
        this.setState({score: 0, TopScore, id: [], win: 'pending'})
      }
    }
  }

  emojiClick = unique => {
    const {id, score} = this.state
    console.log(id)
    if (!id.includes(unique) && score < 11)
      this.setState(prevState => ({
        score: prevState.score + 1,
        id: [...prevState.id, unique],
      }))
    else if (!id.includes(unique) && score === 11)
      this.setState(prevState => ({
        score: prevState.score + 1,
        id: [],
        TopScore: 0,
        win: true,
      }))
    else
      this.setState({
        id: [],
        win: false,
      })
  }

  render() {
    const {score, TopScore, win} = this.state
    const emojisList = this.shuffledEmojisList()
    const urlWon = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    const urlLose = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
    const url = win ? urlWon : urlLose
    return (
      <div className="container">
        <div className="top-container">
          <NavBar score={score} TopScore={TopScore} win={win} />
        </div>
        <div className="bottom-container">
          {!(win === true || win === false) ? (
            <div className="emoji-bottom-container">
              <ul className="unordered-list">
                {emojisList.map(eachItem => (
                  <EmojiCard
                    eachItem={eachItem}
                    key={eachItem.id}
                    emojiClick={this.emojiClick}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="win-loose-display">
              <WinOrLoseCard
                url={url}
                win={win}
                score={score}
                playGame={this.playGame}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default EmojiGame
