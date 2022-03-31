import {Component} from 'react'
import './index.css'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  state = {
    isPlaying: false,
  }

  onClickPlay = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  render() {
    const {isPlaying} = this.state
    const btnText = isPlaying ? 'Pause' : 'Play'
    const {videoURL} = this.props

    return (
      <div className="video-container">
        <div className="responsive-container">
          <ReactPlayer
            url={videoURL}
            playing={isPlaying}
            onClick={this.onClickPlay}
          />
        </div>
      </div>
    )
  }
}

export default VideoPlayer
