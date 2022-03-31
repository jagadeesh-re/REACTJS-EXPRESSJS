import {Component} from 'react'
import './index.css'

class Edit extends Component {
  state = {display: false, textValue: ''}

  saveText = () => this.setState(prevState => ({display: !prevState.display}))

  change = event => this.setState({textValue: event.target.value})

  render() {
    const {textValue, display} = this.state

    return (
      <div className="edit-container">
        <div className="edit-text-container">
          <h1>Editable Text Input</h1>
          {display === false ? (
            <div>
              <input type="text" onChange={this.change} value={textValue} />
              <button type="button" onClick={this.saveText}>
                Save
              </button>
            </div>
          ) : (
            <div className="text-container">
              <p>{textValue}</p>
              <button type="button" onClick={this.saveText}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default Edit
