// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    start: false,
    minutes: 25,
    seconds: 0,
    inc: 0,
    timer: 25,
    reset: true,
    defaultTimer: 25,
  }

  timeClick = () => {
    const {start} = this.state
    this.setState(prevState => ({start: !prevState.start, reset: false}))
    let testId
    if (!start)
      this.testId = setInterval(() => {
        this.setState(prevState => {
          if (prevState.minutes === 0 && prevState.seconds === 0) {
            clearInterval(this.testId)
            return {
              start: false,
              minutes: prevState.defaultTimer,
              timer: prevState.defaultTimer,
              seconds: 0,
            }
          }
          const incrementedTime = ((prevState.inc % 60) + 1) / 100
          console.log('incremented time')
          console.log(incrementedTime)
          const calculatedTime = prevState.timer - incrementedTime - 0.4
          console.log('calculated time')
          console.log(calculatedTime)
          const m = Math.floor(calculatedTime)
          const s = Math.round((calculatedTime - (prevState.timer - 1)) * 100)
          console.log(s)
          return {
            minutes: m,
            seconds: s,
            inc: (prevState.inc % 60) + 1,
            timer: s ? prevState.timer : prevState.timer - 1,
          }
        })
      }, 1000)
    else clearInterval(this.testId)
  }

  timeReset = () => {
    clearInterval(this.testId)
    this.setState({
      start: false,
      minutes: 25,
      seconds: 0,
      reset: true,
      defaultTimer: 25,
    })
  }

  increment = () =>
    this.setState(prevState => ({
      minutes: prevState.minutes + 1,
      timer: prevState.minutes + 1,
      defaultTimer: prevState.minutes + 1,
    }))

  decrement = () =>
    this.setState(prevState => ({
      minutes: prevState.minutes - 1,
      timer: prevState.minutes - 1,
      defaultTimer: prevState.minutes - 1,
    }))

  render() {
    const {start, minutes, seconds, reset, defaultTimer} = this.state
    const url = !start
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const playMessage = start ? 'Pause' : 'Start'
    const altMessage = start ? 'pause icon' : 'play icon'
    const timerStatus = start ? 'Running' : 'Paused'
    let forMinutes
    let forSeconds
    if (minutes.toString().length === 1)
      forMinutes = '0'.concat(minutes.toString())
    else forMinutes = minutes

    console.log('minutes')
    console.log(forMinutes)
    if (seconds.toString().length === 1)
      forSeconds = '0'.concat(seconds.toString())
    else forSeconds = seconds

    console.log('seconds')
    console.log(forSeconds)
    return (
      <div className="container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="inner-container">
          <div className="left-container">
            <div className="count-container">
              <div>
                <h1 className="minutes-count">
                  {forMinutes}:{forSeconds}
                </h1>
                <p className="seconds-counting">{timerStatus}</p>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="time-controls">
              <div className="timebuttons">
                <button type="button" onClick={this.timeClick}>
                  <img src={url} alt={altMessage} />
                  {playMessage}
                </button>
              </div>
              <div className="timebuttons">
                <button type="button" onClick={this.timeReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p>Reset</p>
              </div>
            </div>
            <p className="set-time-heading">Set Timer Limit</p>

            <div className="setLimit">
              {reset ? (
                <button
                  type="button"
                  onClick={reset ? this.decrement : ''}
                  className="change-time"
                >
                  -
                </button>
              ) : (
                <button type="button" className="change-time">
                  -
                </button>
              )}
              <div className="timer">
                <p>{defaultTimer}</p>
              </div>
              {reset ? (
                <button
                  type="button"
                  onClick={this.increment}
                  className="change-time"
                >
                  +
                </button>
              ) : (
                <button type="button" className="change-time">
                  +
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
