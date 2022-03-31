import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Trending from './components/Trending/index'
import Login from './components/Login/index'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home/index'
import Bright from './components/Context/Bright'
import Header from './components/Header/index'
import Gaming from './components/Gaming/index'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute/index'
import Saved from './components/Saved/index'
import NotFound from './components/NotFound/index'

// Replace your code here
class App extends Component {
  state = {light: true, videos: []}

  changeBright = () => {
    console.log('jagadeesh')
    this.setState(prevState => ({light: !prevState.light}))
  }

  savedVideos = listOfVideos => {
    const {videos} = this.state
    const newList = videos.find(eachItem => {
      if (eachItem.id === listOfVideos.id) return true
      return false
    })
    console.log(newList)
    if (newList === undefined)
      this.setState(prevState => ({
        videos: [...prevState.videos, listOfVideos],
      }))
    else {
      const updatedItem = videos.filter(
        eachItem => eachItem.id !== listOfVideos.id,
      )
      this.setState({
        videos: updatedItem,
      })
    }

    console.log('hello')
  }

  render() {
    const {light, videos} = this.state
    console.log(videos.length)
    return (
      <Bright.Provider
        value={{
          light,
          videos,
          changeBright: this.changeBright,
          savedVideos: this.savedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={Saved} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <Route component={NotFound} />
        </Switch>
      </Bright.Provider>
    )
  }
}

export default App
