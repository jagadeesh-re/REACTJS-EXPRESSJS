import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Bright from '../Context/Bright'

class Login extends Component {
  state = {
    type: 'password',
    username: '',
    password: '',
    showError: 'false',
    errorMsg: '',
  }

  submit = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const data = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(apiUrl, options)
    const dataResponse = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      const jwtToken = dataResponse.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 3})
      history.replace('/')
    } else {
      console.log(dataResponse.error_msg)
      this.setState({showError: 'true', errorMsg: dataResponse.error_msg})
    }
  }

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  changeCheck = event => {
    if (event.target.checked) this.setState({type: 'text'})
    else this.setState({type: 'password'})
  }

  render() {
    const {type, showError, errorMsg} = this.state
    console.log(showError)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) return <Redirect to="/" />
    return (
      <Bright.Consumer>
        {value => {
          const {light} = value
          const brightClass = light === true ? null : 'brightClass'
          return (
            <div className="container">
              <div className={`login-container ${brightClass}`}>
                <form onSubmit={this.submit}>
                  <div className="image-logo">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="website logo"
                      className="login-image"
                    />
                  </div>
                  <label htmlFor="username" className="username">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={this.changeUsername}
                  />
                  <label htmlFor="password" className="password">
                    Password
                  </label>
                  <input
                    type={type}
                    placeholder="Password"
                    id="password"
                    onChange={this.changePassword}
                  />

                  <div>
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="checkbox"
                      onChange={this.changeCheck}
                    />
                    <label htmlFor="checkbox">Show Password</label>
                  </div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showError ? (
                    <p className="error-paragraph">{errorMsg}</p>
                  ) : null}
                </form>
              </div>
            </div>
          )
        }}
      </Bright.Consumer>
    )
  }
}
export default Login
