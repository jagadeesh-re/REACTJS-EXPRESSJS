import {Component} from 'react'
import './index.css'

let len = 0

class ReviewsCarousel extends Component {
  state = {id: 0}

  moveleft = () => {
    const {id} = this.state
    if (id > 0) this.setState(prevState => ({id: prevState.id - 1}))
  }

  moveright = () => {
    const {id} = this.state
    if (id < len - 1) this.setState(prevState => ({id: prevState.id + 1}))
  }

  render() {
    const {reviewsList} = this.props
    len = reviewsList.length
    const {id} = this.state
    const {imgUrl, username, companyName, description} = reviewsList[id]

    return (
      <div className="container">
        <div className="inner-container">
          <button type="button" testId="leftArrow" onClick={this.moveleft}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
              alt=" left arrow"
            />
          </button>
          <div className="person-details">
            <h1>Reviews</h1>
            <img src={imgUrl} alt={username} />
            <p className="person-name">{username}</p>
            <p>{companyName}</p>
            <p>{description}</p>
          </div>
          <button type="button" testId="rightArrow" onClick={this.moveright}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
              alt=" right arrow"
            />
          </button>
        </div>
      </div>
    )
  }
}
export default ReviewsCarousel
