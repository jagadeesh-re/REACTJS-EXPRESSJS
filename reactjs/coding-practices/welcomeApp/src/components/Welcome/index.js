import {Component} from 'react'
import './index.css'

class Welcome extends Component {
  state = {
    subscribe: true,
    content: 'Subscribe',
  }

  change = () =>
    this.setState(prevState => {
      if (prevState.subscribe === true)
        return {subscribe: false, content: 'Subscribed'}
      // eslint-disable-next-line no-else-return
      else return {subscribe: true, content: 'Subscribe'}
    })

  render() {
    const {content} = this.state
    return (
      <div className="container">
        <h1>Welcome</h1>
        <p>Thank you!Happy Learning</p>
        <button type="button" onClick={this.change}>
          {content}
        </button>
      </div>
    )
  }
}

export default Welcome
