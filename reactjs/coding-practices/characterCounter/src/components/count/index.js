import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

class Count extends Component {
  state = {list: '', inputValue: ''}

  addInput = event => {
    event.preventDefault()
    const {inputValue} = this.state
    this.setState(prevState => ({
      list: [...prevState.list, inputValue],
      inputValue: '',
    }))
  }

  change = event => this.setState({inputValue: event.target.value})

  render() {
    const {list, inputValue} = this.state
    return (
      <div className="count-container">
        <div className="first-container">
          <div>
            <h1>Count the characters like a Boss...</h1>
          </div>
          {list[0] !== undefined ? (
            <ul>
              {list.map(eachItem => (
                <li key={uuidv4()}>
                  <p>
                    {eachItem} : {eachItem.length}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-user-inputs-img.png"
              alt="no user inputs"
              className="image-empty"
            />
          )}
        </div>
        <div className="second-container">
          <h1>Character Counter</h1>
          <form onSubmit={this.addInput}>
            <input
              type="text"
              onChange={this.change}
              value={inputValue}
              placeholder="Enter the Characters here"
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Count
