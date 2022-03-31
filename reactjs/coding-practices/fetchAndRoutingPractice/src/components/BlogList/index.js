// Write your JS code here
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem/index'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {isDataFetched: false, blogsData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: formattedData, isDataFetched: true})
  }

  render() {
    const {isDataFetched, blogsData} = this.state

    return isDataFetched ? (
      <ul>
        {blogsData.map(eachItem => (
          <BlogItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div testId="loader">
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </div>
    )
  }
}
export default BlogList
