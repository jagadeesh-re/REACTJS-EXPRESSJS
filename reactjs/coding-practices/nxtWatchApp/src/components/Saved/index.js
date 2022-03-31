import './index.css'
import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Bright from '../Context/Bright'
import VideosHeader from '../VideosHeader/index'
import SideBar from '../SideBar/index'

import {
  Container,
  BelowPremium,
  BottomContainer,
  LoaderContainer,
  HomeContainer,
  HomeContainerVideosList,
  VideoItem,
  VideoParagraph,
  ChannelName,
  Heading,
  ViewCount,
} from './style'

const detailsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Saved extends Component {
  state = {searchInput: '', list: '', status: detailsStatus.loading}

  getDetails = videos => {
    if (videos.length !== 0) {
      this.setState({list: videos, status: detailsStatus.success})
    } else {
      this.setState({list: '', status: detailsStatus.failure})
    }
  }

  switchDetails = (brightClass, videos) => {
    const {status} = this.state
    switch (status) {
      case detailsStatus.loading:
        return this.loading(brightClass, videos)
      case detailsStatus.success:
        return this.success(brightClass)
      case detailsStatus.failure:
        return this.failure(brightClass)
      default:
        return null
    }
  }

  loading = (light, videos) => {
    this.getDetails(videos)

    return (
      <LoaderContainer data-testid="loader" light={light}>
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </LoaderContainer>
    )
  }

  getVideos = (eachItem, light) => {
    const {
      channelName,
      id,
      profileImageUrl,
      publishedAt,
      thumbnailUrl,
      title,
      viewCount,
    } = eachItem

    let diffDate = formatDistanceToNow(new Date(publishedAt))

    const arrayItem = diffDate.split(' ')
    if (arrayItem.length === 2)
      diffDate = arrayItem[0].concat(' ', arrayItem[1], ' ago')
    else diffDate = arrayItem[1].concat(' ', arrayItem[2], ' ago')
    console.log(diffDate)
    return (
      <Link to={`/videos/${id}`} className="link">
        <VideoItem key={eachItem.id}>
          <img
            src={thumbnailUrl}
            alt={channelName}
            className="trending-image"
          />
          <div className="video-item-details">
            <img
              src={profileImageUrl}
              alt={channelName}
              className="profile-image"
            />
            <div>
              <VideoParagraph light={light}>{title}</VideoParagraph>
              <ChannelName>{channelName}</ChannelName>
              <ViewCount>
                {viewCount} views . {diffDate}
              </ViewCount>
            </div>
          </div>
        </VideoItem>
      </Link>
    )
  }

  success = light => {
    const {list} = this.state

    return (
      <HomeContainer data-testid="savedVideos" light={light}>
        <HomeContainerVideosList>
          {list.map(eachItem => this.getVideos(eachItem, light))}
        </HomeContainerVideosList>
      </HomeContainer>
    )
  }

  failure = light => {
    const failData =
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'

    return (
      <div className="noSavedContainer">
        <img src={failData} alt="no saved videos" className="noSaved" />
        <Heading light={light}>No saved videos found</Heading>
        <VideoParagraph light={light}>
          You can save your videos while watching them
        </VideoParagraph>
      </div>
    )
  }

  render() {
    return (
      <Bright.Consumer>
        {value => {
          const {light, videos, changeBright} = value

          return (
            <>
              <Header />
              <BottomContainer>
                <SideBar />
                <Container light={light}>
                  <BelowPremium light={light}>
                    <VideosHeader />

                    {this.switchDetails(light, videos)}
                  </BelowPremium>
                </Container>
              </BottomContainer>
            </>
          )
        }}
      </Bright.Consumer>
    )
  }
}
export default Saved
