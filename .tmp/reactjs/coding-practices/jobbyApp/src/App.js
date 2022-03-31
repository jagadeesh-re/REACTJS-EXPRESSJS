import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login/index'
import Home from './components/Home/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import Jobs from './components/Jobs/index'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound/index'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
