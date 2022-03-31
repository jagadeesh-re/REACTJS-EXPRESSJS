import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: false, msg: ''}

  submit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 3})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({error: true, msg: data.error_msg})
    }
  }

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  render() {
    const {username, password, error, msg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) return <Redirect to="/" />

    return (
      <div className="login-container">
        <div className="form-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <form onSubmit={this.submit}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={this.changeUsername}
              value={username}
              className="input-login"
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.changePassword}
              value={password}
              className="input-login"
            />
            <button type="submit" className="button-login">
              Login
            </button>
          </form>
          {error ? <p className="error">*{msg}</p> : ''}
        </div>
      </div>
    )
  }
}
export default Login
