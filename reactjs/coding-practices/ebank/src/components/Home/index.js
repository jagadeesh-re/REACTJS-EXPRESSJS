import './index.css'
import {Component} from 'react'
import Header from '../Header/index'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    )
  }
}

export default Home
