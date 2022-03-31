import {Route, Switch} from 'react-router-dom'
import Header from './components/Header/index'
import HomeRoute from './components/Home/index'
import AboutRoute from './components/About/index'
import ContactRoute from './components/Contact/index'
import NotFoundRoute from './components/NotFound/index'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/about" component={AboutRoute} />
      <Route exact path="/contact" component={ContactRoute} />
      <Route component={NotFoundRoute} />
    </Switch>
  </>
)

export default App
