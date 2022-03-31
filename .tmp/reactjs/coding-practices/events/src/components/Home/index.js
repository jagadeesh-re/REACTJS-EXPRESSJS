import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import ReactFileReader from 'react-file-reader'
import {GiCheckMark, GiCrossMark} from 'react-icons/gi'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {jsonfile: '', evaluateFile: false}

  handleFiles = files => {
    const reader = new FileReader()

    reader.onload = async () => {
      console.log(typeof reader.result)

      const jwtToken = Cookies.get('jwt_token')
      const url = 'https://financepeer-demo-records.herokuapp.com/book/'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: reader.result,
      }
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok === true) this.setState({evaluateFile: true})
      else this.setState({evaluateFile: false})
    }
    reader.readAsText(files[0])
  }

  render() {
    const {jsonfile, evaluateFile} = this.state
    console.log(evaluateFile)
    console.log(jsonfile)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">
              Upload Files Secure, Anonymous, Fast, Free
            </h1>

            <p className="home-description">
              You can upload, view files with this Application.Type of Files :
              JSON
            </p>
            <Link to="/records">
              <button type="button" className="browse-button start-uploading">
                See Records
              </button>
            </Link>
          </div>
          <div className="card">
            <div className="inner-card">
              <img
                src="https://res.cloudinary.com/dmpepn8dm/image/upload/v1647745733/Folder_4x_ok7ril.png"
                alt="folder"
                className="folder-image"
              />
              <p className="click-paragraph">Click Button to upload Files</p>
              <ReactFileReader
                fileTypes={['.json']}
                handleFiles={this.handleFiles}
              >
                <div className="upload-container">
                  <button type="button" className="browse-button">
                    Browse Files
                  </button>
                  {evaluateFile === true ? (
                    <div className="succes-container">
                      <GiCheckMark className="check-icon" />
                      <p className="check-icon">Uploaded Sucessfully</p>
                    </div>
                  ) : (
                    <div className="succes-container">
                      <GiCrossMark className="check-icon failure" />
                      <p className="check-icon failure">Please Upload File</p>
                    </div>
                  )}
                </div>
              </ReactFileReader>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
