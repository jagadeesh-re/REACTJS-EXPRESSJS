import {Switch, Route} from 'react-router-dom'

import Header from './components/Header/index'
import About from './components/About/index'
import Home from './components/Home/index'
import Contact from './components/Contact/index'
import BlogItemDetails from './components/BlogItemDetails/index'
import NotFound from './components/NotFound/index'

import './App.css'

const App = () => (
  <div className="app-container">
    <div className="responsive-container">
      <div className="app-body">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route path="/blogs/:id" component={BlogItemDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </div>
)

export default App
