import './index.css'
import {Component} from 'react'

class AlertNotifications extends Component {
  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url = 'http://localhost:3004/login/'
    const userDetails = {
      username: 'jagadeesh',
      password: 'jagadeesh@2022',
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
  }

  render() {
    return
    ;<div>hello</div>
  }
}
export default AlertNotifications
