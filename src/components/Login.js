import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

const Login = ({onLogin, users, authedUser}) => {
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
                onClick={()=> onLogin(userId)}
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

function mapDispatchToProps(dispatch){
  return{
    onLogin: (userId) => {
      dispatch(setAuthedUser(userId))
    }
  }
}

function mapStateToProps({users}){
  return {
    users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
