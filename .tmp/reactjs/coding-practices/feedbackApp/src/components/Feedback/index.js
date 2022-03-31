import {Component} from 'react'
import './index.css'

class Feedback extends Component {
  state = {end: false}

  endPage = () => this.setState({end: true})

  render() {
    const {resources} = this.props
    const {emojis, loveEmojiUrl} = resources
    const {end} = this.state

    return (
      <div className="container">
        <div className="innerContainer">
          {end ? null : (
            <h1>
              How satisfied are you with our customer support performance?
            </h1>
          )}
          <ul className="emojisContainer">
            {end ? (
              <li className="endPage">
                <img
                  src={loveEmojiUrl}
                  alt="love emoji"
                  className="loveImage"
                />
                <h1>Thank You!</h1>
                <p className="feedback">
                  we will use your feedback to improve our customer service and
                  performance
                </p>
              </li>
            ) : (
              emojis.map(eachItem => (
                <li key={eachItem.id}>
                  <img
                    onClick={this.endPage}
                    className="image"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p>{eachItem.name}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default Feedback
