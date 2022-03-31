import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Tasks extends Component {
  state = {list: [], task: '', tag: 'HEALTH', active: ''}

  changeTask = event => this.setState({task: event.target.value})

  changeTag = event => this.setState({tag: event.target.value})

  submitForm = event => {
    event.preventDefault()
    const {task, tag} = this.state
    const newList = {
      task,
      tag,
    }
    console.log(newList)
    this.setState(prevState => ({
      list: [...prevState.list, newList],
      task: '',
      tag: 'HEALTH',
    }))
  }

  selectedItems = id => this.setState({active: id})

  render() {
    const {list, task, tag, active} = this.state
    console.log(task)
    console.log(list)
    const itemsAdded = list.filter(eachItem => {
      if (eachItem.tag.includes(active)) return true

      return false
    })

    return (
      <div className="tasks-container">
        <div className="first-container">
          <h1 className="create-heading">Create a task!</h1>

          <form onSubmit={this.submitForm} className="formElement">
            <label htmlFor="taskId">Task</label>
            <input
              type="text"
              placeholder="Enter the task here"
              id="taskId"
              onChange={this.changeTask}
              value={task}
              className="textInput"
            />
            <label htmlFor="optionId">Tags</label>
            <select id="optionId" value={tag} onChange={this.changeTag}>
              {tagsList.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="addTask">
              Add Task
            </button>
          </form>
        </div>
        <div className="second-container">
          <h1>Tags</h1>
          <ul className="tags">
            {tagsList.map(eachItem => (
              <li
                className="tag-item"
                key={eachItem.optionId}
                onClick={() => this.selectedItems(eachItem.optionId)}
              >
                <button type="button" className="tag-button">
                  {eachItem.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {list[0] !== undefined ? (
            <ul className="tags-added-container">
              {itemsAdded.map(eachItem => (
                <li key={uuidv4()} className="item-added">
                  <p className="task-paragraph">{eachItem.task}</p>
                  <p className="tag-paragraph">{eachItem.tag}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}
export default Tasks
