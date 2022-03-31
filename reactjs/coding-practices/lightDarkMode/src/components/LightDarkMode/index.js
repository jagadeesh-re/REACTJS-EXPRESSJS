// Write your code here
import {Component} from 'react'
import './index.css'

class LightDarkMode extends Component {
  state = {
    isColor: true,
    className: 'color',
    content: 'Light Mode',
    headingColor: 'heading',
  }

  changeColor = () =>
    // eslint-disable-next-line consistent-return
    this.setState(prevState => {
      if (prevState.isColor === true)
        return {
          isColor: false,
          className: 'color1',
          content: 'Dark Mode',
          headingColor: 'headingColor1',
        }
      return {
        isColor: true,
        className: 'color',
        content: 'light Mode',
        headingColor: 'heading',
      }
    })

  render() {
    const {className, headingColor, content} = this.state
    return (
      <div className="container">
        <div className={className}>
          <h1 className={headingColor}>click to change mode</h1>
          <button type="button" onClick={this.changeColor}>
            {content}
          </button>
        </div>
      </div>
    )
  }
}

export default LightDarkMode
