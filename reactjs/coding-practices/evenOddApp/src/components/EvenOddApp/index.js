import {Component} from 'react'
import './index.css'

class EvenOddApp extends Component {
  state = {
    content: 'Count is Even',
    count: 0,
  }

  evenCheck = () =>
    this.setState(prevState => {
      const result = Math.ceil(Math.random() * 100)
      console.log(result)
      if ((result + prevState.count) % 2 !== 0)
        return {
          content: 'Count is Odd',
          count: result + prevState.count,
        }

      return {
        content: 'Count is Even',
        count: result + prevState.count,
      }
    })

  render() {
    const {content, count} = this.state
    return (
      <div className="container">
        <div className="innerContainer">
          <h1>Count {count}</h1>
          <p>{content}</p>
          <button type="button" onClick={this.evenCheck}>
            Increment
          </button>
          <p>*Increase by random number between 0 to 100</p>
        </div>
      </div>
    )
  }
}

export default EvenOddApp
