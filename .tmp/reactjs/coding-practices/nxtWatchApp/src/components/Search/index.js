import './index.css'
import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {Container, ContainerSearch, Input} from './style'
import Bright from '../Context/Bright'

class Search extends Component {
  state = {searchInput: ''}

  changeInput = event => this.setState({searchInput: event.target.value})

  search = () => {
    const {searchInput} = this.state
    const {searchfun} = this.props
    searchfun(searchInput)
  }

  render() {
    const {searchInput} = this.state
    return (
      <Bright.Consumer>
        {value => {
          const {light} = value
          return (
            <Container light={light}>
              <Input
                type="search"
                placeholder="Search"
                light={light}
                onChange={this.changeInput}
                value={searchInput}
              />
              <ContainerSearch
                data-testid="searchButton"
                light={light}
                onClick={this.search}
              >
                <AiOutlineSearch />
              </ContainerSearch>
            </Container>
          )
        }}
      </Bright.Consumer>
    )
  }
}

export default Search
