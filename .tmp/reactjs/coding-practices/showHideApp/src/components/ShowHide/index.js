import {Component} from 'react'
import './index.css'

class App extends Component {
  state = {
    isFirstName: false,
    isLastName: false,
    fClassName: 'mask1',
    lClassName: 'mask1',
    fname: '',
    lname: '',
  }

  hide = () =>
    this.setState(prevState => {
      if (prevState.isFirstName === true)
        return {
          isFirstName: false,
          isLastName: prevState.isLastName,
          fClassName: 'mask1',
          lClassName: prevState.lClassName,
          fname: '',
          lname: prevState.lname,
        }
      return {
        isFirstName: true,
        isLastName: prevState.isLastName,
        fClassName: 'mask',
        lClassName: prevState.lClassName,
        fname: 'Joe',
        lname: prevState.lname,
      }
    })

  hidel = () =>
    this.setState(prevState => {
      if (prevState.isLastName === true)
        return {
          isFirstName: prevState.isFirstName,
          isLastName: false,
          fClassName: prevState.fClassName,
          lClassName: 'mask1',
          fname: prevState.fname,
          lname: '',
        }
      return {
        isFirstName: prevState.isFirstName,
        isLastName: true,
        fClassName: prevState.fClassName,
        lClassName: 'mask',
        fname: prevState.fname,
        lname: 'Jonas',
      }
    })

  render() {
    const {fClassName, fname, lClassName, lname} = this.state
    return (
      <div className="container">
        <h1 className="heading">Show/Hide</h1>
        <div className="alignNamesClass">
          <div className="item">
            <button type="button" onClick={this.hide}>
              Show/Hide Firstname
            </button>
            <div className={fClassName}>
              <p>{fname}</p>
            </div>
          </div>
          <div className="item">
            <button type="button" onClick={this.hidel}>
              Show/Hide Lastname
            </button>
            <div className={lClassName}>
              <p>{lname}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
