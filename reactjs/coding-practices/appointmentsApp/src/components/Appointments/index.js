import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {starred: false, list: '', title: '', date: ''}

  changeInput = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({date: event.target.value})
  }

  accept = unique => {
    const {list} = this.state
    const newlist = list.map(eachItem => {
      if (eachItem.id === unique) {
        const neweachItem = {...eachItem, starred: !eachItem.starred}
        return neweachItem
      }
      return eachItem
    })

    this.setState({
      list: newlist,
    })
  }

  submit = event => {
    event.preventDefault()
    const {starred, list, title, date} = this.state

    const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    console.log(formatedDate)

    const createAppointment = {
      id: uuidv4(),
      title,
      date: formatedDate,
      starred: false,
    }
    this.setState(prevState => ({
      list: [...prevState.list, createAppointment],
      title: '',
      date: '',
    }))
    console.log('hello')
  }

  starred = () => this.setState(prevState => ({starred: !prevState.starred}))

  render() {
    const {starred, list, title, date} = this.state
    const urlstar =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    const urlfilled =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

    let allAppointments
    if (starred === true) {
      allAppointments = list.filter(eachItem => eachItem.starred === starred)
    } else {
      allAppointments = list
    }

    return (
      <div className="container">
        <div className="inner-container">
          <div className="form-container">
            <form className="form" onSubmit={this.submit}>
              <h1>Add Appointment</h1>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                onChange={this.changeInput}
                value={title}
                id="title"
              />
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                onChange={this.changeDate}
                value={date}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr />
          <div className="appointment">
            <h1 className="appointment-heading">Appointments</h1>
            <button type="button" className="starred" onClick={this.starred}>
              Starred
            </button>
          </div>
          <ul>
            {allAppointments[0] !== undefined
              ? allAppointments.map(eachItem => (
                  <AppointmentItem
                    eachItem={eachItem}
                    key={eachItem.id}
                    acceptStarred={this.accept}
                    url={eachItem.starred ? urlfilled : urlstar}
                  />
                ))
              : null}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
