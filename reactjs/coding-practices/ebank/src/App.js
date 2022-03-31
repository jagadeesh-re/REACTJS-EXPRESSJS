import './App.css'
import {Redirect, Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/index'

import Login from './components/Login/index'
import Home from './components/Home/index'
import NotFound from './components/NotFound/index'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
