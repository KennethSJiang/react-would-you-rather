import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  handleUserLogin = (e, userId) =>{
    const { dispatch } = this.props
    e.preventDefault()
    dispatch(setAuthedUser(userId))
  }

  render(){
    const { users, authedUser } = this.props
    if(authedUser){
      return <Redirect to='/' />
    }else{
      return(
        <div className='center'>
        <h3>Login as one of users below</h3>
        <ul>
          {
            Object.keys(users).map((userId) => (
              <li key={userId} className='question'>
                <div
                  className='question-info'
                  onClick={(e)=> this.handleUserLogin(e, userId)}
                >
                  <span>{userId}</span>
                </div>
              </li>
            ))
          }
        </ul>
        </div>
      )
    }
  }
}


function mapStateToProps({users}){
  return {
    users: users
  }
}

export default connect(mapStateToProps)(Login)
