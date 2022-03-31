import {Component} from 'react'
import './index.css'

import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem/index'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {comments: '', name: '', text: '', like: false}

  componentDidMount() {
    this.gy()
  }

  gy = async () => {
    const url = ' http://localhost:3003/books/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer`,
      },
      body: JSON.stringify({username: 'jagadeesh', password: 'hello'}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
  }

  submit = event => {
    event.preventDefault()
    const {name, text} = this.state
    const commentToAdd = {
      id: uuidv4(),
      time: new Date(),
      name,
      text,
      like: false,
    }
    this.setState(prevState => ({
      comments: [...prevState.comments, commentToAdd],
      name: '',
      text: '',
    }))
  }

  changeName = event => {
    this.setState({name: event.target.value})
  }

  changeComment = event => {
    this.setState({text: event.target.value})
  }

  liked = unique => {
    const {comments} = this.state
    const list = comments.map(eachItem => {
      if (eachItem.id === unique) {
        return {...eachItem, like: !eachItem.like}
      }
      return eachItem
    })

    this.setState({comments: list})
  }

  deleted = unique => {
    const {comments} = this.state
    const list = comments.filter(eachItem => eachItem.id !== unique)

    this.setState({comments: list})
  }

  render() {
    const {name, text, comments} = this.state

    console.log(comments)
    console.log(name)
    console.log(text)
    const likeUrl =
      'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    const likedUrl =
      'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    // console.log(formatDistanceToNow(new Date()))
    return (
      <div className="container">
        <h1 className="heading">Comments</h1>
        <div className="inner-container">
          <div className="form-container">
            <p className="paragraph">Say something about 4.0 Technologies</p>
            <form className="form" onSubmit={this.submit}>
              <input
                type="text"
                placeholder="Your Name"
                onChange={this.changeName}
                value={name}
              />
              <textarea
                cols="25"
                rows="5"
                placeholder="Your Comment"
                className="textarea"
                onChange={this.changeComment}
                value={text}
              />
              <button type="submit" className="add-comment">
                Add Comment
              </button>
            </form>
          </div>
          <img
            className="commentImage"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div>
          <div className="total-comments">
            <div className="count-comment">
              <p>{comments.length}</p>
            </div>
            <p>Comments</p>
          </div>
          <ul>
            {comments[0] !== undefined
              ? comments.map(eachItem => (
                  <CommentItem
                    key={eachItem.id}
                    eachItem={eachItem}
                    url={eachItem.like ? likedUrl : likeUrl}
                    liked={this.liked}
                    deleted={this.deleted}
                    classColour={initialContainerBackgroundClassNames}
                  />
                ))
              : ''}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
