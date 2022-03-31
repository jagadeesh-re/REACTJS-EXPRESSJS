// Write your code here
// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    minutes: 0,
    seconds: 0,
    inc: 0,
  }

  startTimer = () => {
    console.log('clicked')
    this.testId = setInterval(() => {
      this.setState(prevState => {
        console.log('clicked2')
        const incrementedTime = ((prevState.inc % 60) + 1) / 100
        console.log('incremented time')
        console.log(incrementedTime)
        const calculatedTime = prevState.minutes + incrementedTime
        console.log('calculated time')
        console.log(calculatedTime)
        const m = Math.floor(calculatedTime)
        const s = Math.round((calculatedTime - m) * 100)

        console.log(s)
        console.log(s)
        return {
          minutes: s === 60 ? prevState.minutes + 1 : m,
          seconds: s === 60 ? 0 : s,
          inc: s === 60 ? 0 : incrementedTime * 100,
        }
      })
    }, 1000)
  }

  stopper = () => {
    clearInterval(this.testId)
  }

  reset = () => {
    clearInterval(this.testId)
    this.setState({
      minutes: 0,
      seconds: 0,
      inc: 0,
    })
  }

  render() {
    let forMinutes
    let forSeconds
    const {minutes, seconds} = this.state

    console.log('minutes')
    console.log(minutes)
    console.log('seconds')
    console.log(seconds)
    if (minutes.toString().length === 1)
      forMinutes = '0'.concat(minutes.toString())
    else forMinutes = minutes

    console.log('minutes')
    console.log(forMinutes)
    if (seconds.toString().length === 1)
      forSeconds = '0'.concat(seconds.toString())
    else forSeconds = seconds

    return (
      <div className="container">
        <div className="inner-container">
          <div>
            <h1>Stopwatch</h1>
            <div className="box">
              <div className="watch-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png "
                  alt="stopwatch"
                />
                <p className="timer-paragraph">Timer</p>
              </div>
              <h1 className="display-timer">
                {forMinutes}:{forSeconds}
              </h1>
              <div>
                <button
                  type="button"
                  className="start"
                  onClick={this.startTimer}
                >
                  Start
                </button>

                <button type="button" className="stop" onClick={this.stopper}>
                  Stop
                </button>

                <button type="button" className="reset" onClick={this.reset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
