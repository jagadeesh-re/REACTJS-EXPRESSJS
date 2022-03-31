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
  ViewCount,
} from './style'

const detailsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {searchInput: '', list: '', status: detailsStatus.loading}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const newList = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        channelName: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))

      console.log(newList)
      this.setState({list: newList, status: detailsStatus.success})
    } else {
      console.log('error')
    }
  }

  switchDetails = brightClass => {
    const {status} = this.state
    switch (status) {
      case detailsStatus.loading:
        return this.loading(brightClass)
      case detailsStatus.success:
        return this.success(brightClass)
      case detailsStatus.failure:
        return this.failure(brightClass)
      default:
        return null
    }
  }

  loading = light => (
    <LoaderContainer data-testid="loader" light={light}>
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </LoaderContainer>
  )

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
            alt="video thumbnail"
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
      <HomeContainer data-testid="trending" light={light}>
        <HomeContainerVideosList>
          {list.map(eachItem => this.getVideos(eachItem, light))}
        </HomeContainerVideosList>
      </HomeContainer>
    )
  }

  failure = () => {
    const {light} = this.state

    const failData = light
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <div>
        <img src={failData} alt="nxt watch logo" />
      </div>
    )
  }

  render() {
    return (
      <Bright.Consumer>
        {value => {
          const {light, changeBright} = value

          return (
            <>
              <Header />
              <BottomContainer>
                <SideBar />
                <Container light={light}>
                  <BelowPremium light={light}>
                    <VideosHeader />

                    {this.switchDetails(light)}
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
export default Trending
