// Write your code here.
import {Component} from 'react'
import './index.css'
import FaqItem from '../FaqItem/index'

class Faqs extends Component {
  state = {id: []}

  change = unique => {
    const {id} = this.state
    this.setState(prevState => {
      if (id.includes(unique)) {
        const newid = id.filter(each => each !== unique)
        return {id: newid}
      }

      return {
        id: [...prevState.id, unique],
      }
    })
  }

  render() {
    const {id} = this.state
    const {faqsList} = this.props
    const url1 =
      'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png'
    const url2 =
      'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png'
    return (
      <div className="container">
        <div className="inner-container">
          <h1 className="main-heading">FAQs</h1>
          <ul>
            {faqsList.map(eachItem => (
              <FaqItem
                eachItem={eachItem}
                key={eachItem.id}
                url={id.includes(eachItem.id) ? url2 : url1}
                change={this.change}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Faqs
