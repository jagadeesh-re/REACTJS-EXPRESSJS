import './App.css'
import {Route, Switch} from 'react-router-dom'
import Course from './components/Courses/index'
import CourseDetail from './components/CourseDetail/index'
import NotFound from './components/NotFound/index'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Course} />
    <Route exact path="/courses/:id" component={CourseDetail} />
    <Route component={NotFound} />
  </Switch>
)

export default App
