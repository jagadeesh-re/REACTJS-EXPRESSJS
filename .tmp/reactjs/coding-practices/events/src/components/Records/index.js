import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import Empty from '../Empty/index'
import Failure from '../Failure/index'
import {LiItem} from './style'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
  inProgress: 'IN_PROGRESS',
}

const bookLogos = [
  {
    id: 1,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836444/books-logo/12_o2objj.jpg',
  },
  {
    id: 2,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836444/books-logo/11_e0mtks.jpg',
  },
  {
    id: 3,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836443/books-logo/13_y6apay.jpg',
  },
  {
    id: 4,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836442/books-logo/10_u6x5yt.jpg',
  },
  {
    id: 5,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836441/books-logo/8_sehgym.jpg',
  },
  {
    id: 6,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836441/books-logo/7_obdxsk.jpg',
  },
  {
    id: 7,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836441/books-logo/9_ajx86l.jpg',
  },
  {
    id: 8,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836441/books-logo/6_lq8dnz.jpg',
  },
  {
    id: 9,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836440/books-logo/5_ws2lrx.jpg',
  },
  {
    id: 10,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836444/books-logo/12_o2objj.jpg',
  },
  {
    id: 11,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836440/books-logo/3_xpok4m.jpg',
  },
  {
    id: 12,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836439/books-logo/4_gbmvc8.jpg',
  },
  {
    id: 13,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836444/books-logo/12_o2objj.jpg',
  },
  {
    id: 14,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836439/books-logo/14_wprqdg.jpg',
  },
  {
    id: 15,
    url:
      'https://res.cloudinary.com/dmpepn8dm/image/upload/v1647836438/books-logo/2_ykivxt.jpg',
  },
]

class Records extends Component {
  state = {records: '', status: apiStatusConstants.inProgress}

  componentDidMount() {
    this.getBooks()
  }

  onSubmitSuccess = () => {
    const {records} = this.state
    return (
      <ul className="record-items">
        {records.map(eachItem => {
          const num = Math.floor(Math.random() * 15)
          const {url} = bookLogos[num]
          return (
            <LiItem key={eachItem.id} number={eachItem.id % 10}>
              <div className="content">
                <div className="book-logo-container">
                  <img src={url} alt="book-logos" className="book-logos" />
                </div>
                <div>
                  <h1 className="item-heading">{eachItem.title}</h1>
                  <p className="item-paragraph">{eachItem.body}</p>
                </div>
              </div>
            </LiItem>
          )
        })}
      </ul>
    )
  }

  retryApi = () => this.getBooks()

  getDetals = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.onSubmitSuccess()
      case apiStatusConstants.failure:
        return <Failure retryApi={this.retryApi} />
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.empty:
        return <Empty />
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getBooks = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = 'https://financepeer-demo-records.herokuapp.com/getBooks/'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      if (data.tweetsResult[0] !== undefined)
        this.setState({
          status: apiStatusConstants.success,
          records: data.tweetsResult,
        })
      else this.setState({status: apiStatusConstants.empty})
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  render() {
    const {records} = this.state
    return (
      <>
        <Header />
        <div className="record-sections">{this.getDetals()}</div>
      </>
    )
  }
}
export default Records
