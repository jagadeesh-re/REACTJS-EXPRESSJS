import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../passworddItem/index'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    username: '',
    website: '',
    password: '',
    search: '',
    passwordshow: false,
  }

  submit = event => {
    event.preventDefault()

    this.setState(prevState => {
      const newpassword = {
        id: uuidv4(),
        username: prevState.username,
        website: prevState.website,
        password: prevState.password,
      }
      return {
        passwordList: [...prevState.passwordList, newpassword],
        username: '',
        website: '',
        password: '',
        search: '',
      }
    })
  }

  check = event => {
    this.setState(prevState => ({passwordshow: !prevState.passwordshow}))
  }

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  changeWebsite = event => this.setState({website: event.target.value})

  changeSearch = event => this.setState({search: event.target.value})

  deleteRequest = unique =>
    this.setState(prevState => {
      const newpasswordlist = prevState.passwordList.filter(
        eachItem => eachItem.id !== unique,
      )
      return {passwordList: newpasswordlist}
    })

  render() {
    const {
      passwordList,
      username,
      password,
      website,
      search,
      passwordshow,
    } = this.state
    console.log(passwordList)
    let newList
    if (passwordList !== undefined)
      newList = passwordList.filter(eachItem =>
        eachItem.website.toLowerCase().includes(search.toLowerCase()),
      )

    return (
      <div className="container">
        <div className="inner-container">
          <img
            className="top-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            alt="app logo"
          />
          <div className="password-container">
            <div className="password-form">
              <h1 className="password-heading">Add New Password</h1>
              <form onSubmit={this.submit}>
                <div className="input-container">
                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="website"
                    />
                  </div>
                  <div className="input-text">
                    <input
                      type="text"
                      className="text"
                      placeholder="Enter Website"
                      onChange={this.changeWebsite}
                      value={website}
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="website"
                    />
                  </div>
                  <div className="input-text">
                    <input
                      type="text"
                      className="text"
                      placeholder="Enter Username"
                      onChange={this.changeUsername}
                      value={username}
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="website"
                    />
                  </div>
                  <div className="input-text">
                    <input
                      type="password"
                      className="text"
                      placeholder="Enter Password"
                      onChange={this.changePassword}
                      value={password}
                    />
                  </div>
                </div>

                <button type="submit" className="add-password">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-managerlg"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-managersm"
              />
            </div>
          </div>

          <div className="password-show">
            <div className="password-show-and-search">
              <div className="your-passwords">
                <h1 className="your-password-heading">Your Passwords</h1>
                <p className="password-count">{newList.length}</p>
              </div>
              <div>
                <div className="input-container search-input">
                  <div className="search-container">
                    <img
                      className="search"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                      alt="search"
                    />
                  </div>
                  <div className="input-text">
                    <input
                      type="search"
                      className="text"
                      placeholder="Search"
                      onChange={this.changeSearch}
                      value={search}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="show-password-checkbox">
              <input
                type="checkbox"
                id="checkbox"
                className="password-checkbox"
                onChange={this.check}
              />
              <label htmlFor="checkbox">Show passwords</label>
            </div>

            {newList[0] !== undefined ? (
              <ul>
                {newList.map(eachItem => (
                  <PasswordItem
                    eachItem={eachItem}
                    key={eachItem.id}
                    deleteRequest={this.deleteRequest}
                    passwordshow={passwordshow}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password"
                />
                <p className="no-passwords-heading">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
