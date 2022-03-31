import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    errorf: false,
    errorl: false,
    displaySuccess: false,
  }

  submitForm = async event => {
    event.preventDefault()
    const {firstname, lastname, displaySuccess} = this.state
    let errorfirstname
    let errorlastname
    let success
    if (firstname === '' && lastname !== '') {
      errorfirstname = true
      success = false
    }
    if (firstname !== '' && lastname === '') {
      errorlastname = true
      success = false
    }
    if (firstname === '' && lastname === '') {
      errorfirstname = true
      errorlastname = true
      success = false
    }
    if (firstname !== '' && lastname !== '') {
      errorfirstname = false
      errorlastname = false
      success = true
    }
    this.setState({
      errorf: errorfirstname,
      errorl: errorlastname,
      displaySuccess: success,
    })
  }

  onChangefirstname = event => {
    this.setState({firstname: event.target.value})
  }

  onChangelastname = event => {
    this.setState({lastname: event.target.value})
  }

  onLastname = event => {
    if (event.target.value === '')
      this.setState({lastname: event.target.value, errorl: true})
    else this.setState({lastname: event.target.value, errorl: false})
  }

  onFirstname = event => {
    if (event.target.value === '')
      this.setState({firstname: event.target.value, errorf: true})
    else this.setState({firstname: event.target.value, errorf: false})
  }

  renderLastnameField = () => {
    const {lastname} = this.state
    return (
      <>
        <label className="input-label" htmlFor="lastname">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastname"
          className="lastname-input-filed"
          value={lastname}
          placeholder="Last Name"
          onBlur={this.onLastname}
          onChange={this.onChangelastname}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {firstname} = this.state
    return (
      <>
        <label className="input-label" htmlFor="firstname">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstname"
          className="firstname-input-filed"
          value={firstname}
          placeholder="First Name"
          onBlur={this.onFirstname}
          onChange={this.onChangefirstname}
        />
      </>
    )
  }

  reset = () =>
    this.setState({displaySuccess: false, errorf: false, errorl: false})

  render() {
    const {errorf, errorl, displaySuccess} = this.state
    return (
      <div className="login-form-container">
        <div>
          <h1>Registration</h1>
          {!displaySuccess ? (
            <form className="form-container" onSubmit={this.submitForm}>
              <div>
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                {errorf ? <p className="error-message">Required</p> : ''}
                <div className="input-container">
                  {this.renderLastnameField()}
                </div>
                {errorl ? <p className="error-message">Required</p> : ''}
                <button type="submit" className="login-button">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={this.reset} className="form-container">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
                  alt="success"
                  className="success"
                />
                <p className="submited-success-paragraph">
                  Submitted Successfully
                </p>
                <button type="submit" className="reset-button">
                  Submit Another Response
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
