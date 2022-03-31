import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Bright from '../Context/Bright'
import Premium from '../Premium/index'
import Search from '../Search/index'
import NoVideos from '../NoVideos/index'
import SideBar from '../SideBar/index'

import Failure from '../Failure/index'
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
  empty: 'EMPTY',
}

class Home extends Component {
  state = {
    searchInput: '',
    list: '',
    status: detailsStatus.loading,
    close: false,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({searchInput: ''})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      if (data.total !== 0) {
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
      } else this.setState({list: '', status: detailsStatus.empty})
    } else {
      this.setState({list: '', status: detailsStatus.failure})
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
        return <Failure retryApi={this.retryApi} />
      case detailsStatus.empty:
        return <NoVideos retryApi={this.retryApi} />
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
            alt={channelName}
            className="thumbnail-image"
          />
          <div className="video-item-details">
            <img
              src={profileImageUrl}
              alt="channel logo"
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
      <HomeContainer data-testid="home" light={light}>
        <HomeContainerVideosList>
          {list.map(eachItem => this.getVideos(eachItem, light))}
        </HomeContainerVideosList>
      </HomeContainer>
    )
  }

  searchFunction = searchWord =>
    this.setState({searchInput: searchWord}, this.getDetails)

  closed = () => {
    this.setState({close: true})
  }

  retryApi = () => {
    this.getDetails()
    console.log('hello')
  }

  render() {
    const {close} = this.state
    return (
      <Bright.Consumer>
        {value => {
          const {light, changeBright, addVideosToContext} = value

          return (
            <>
              <Header />
              <BottomContainer>
                <SideBar />
                <Container light={light}>
                  {close ? null : <Premium closed={this.closed} />}

                  <BelowPremium light={light}>
                    <Search searchfun={this.searchFunction} />
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
export default Home
