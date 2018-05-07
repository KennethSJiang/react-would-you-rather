import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import ErrorPage from './ErrorPage'
import Question from './Question'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import { BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  handleLogoutClick = (e) =>{
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    const { hasLoggedIn, currentUser } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {hasLoggedIn ?
              <Login /> :
              <Fragment>
                <p>Welcome <b>{currentUser.name}</b>!<button className='btn-mini' onClick={this.handleLogoutClick}>Logout</button></p>
                <hr/>
                <div>
                  <Route path='/' exact component={Dashboard}/>
                  <Route path='/add' component={NewQuestion}/>
                  <Route path='/questions/:id' component={Question}/>
                  <Route path='/404' component={ErrorPage}/>
                  <Route path='/leaderboard' component={Leaderboard}/>
                </div>
              </Fragment>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({users, authedUser}){
  return{
    hasLoggedIn: authedUser === null,
    currentUser: users[authedUser]
  }
}

export default connect(mapStateToProps)(App)
