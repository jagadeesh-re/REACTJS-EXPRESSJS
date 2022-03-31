import './index.css'

const TodoItem = props => {
  const {eachItem, functiondelete} = props
  const {id, title} = eachItem

  const removeList = () => {
    functiondelete(id)
  }

  return (
    <li>
      <p>{title}</p>
      <button type="button" onClick={removeList}>
        Delete
      </button>
    </li>
  )
}
export default TodoItem
