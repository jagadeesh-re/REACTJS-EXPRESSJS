import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {user: '', pass: '', showSubmitError: false, errorMsg: ''}

  changeUser = event => this.setState({user: event.target.value})

  changePass = event => this.setState({pass: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submit = async event => {
    event.preventDefault()
    const {user, pass} = this.state
    const userData = {
      user_id: user,
      pin: pass,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {user, pass, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <h1>Welcome Back</h1>

          <form onSubmit={this.submit}>
            <label htmlFor="userInput">User ID</label>
            <input
              type="text"
              id="userInput"
              placeholder="Enter User ID"
              onChange={this.changeUser}
              value={user}
            />
            <label htmlFor="pin">PIN</label>
            <input
              type="password"
              id="pin"
              placeholder="Enter PIN"
              onChange={this.changePass}
              value={pass}
            />
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
