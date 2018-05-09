import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const ErrorPage = () =>{
  return(
    <div className="error-container">
      <h1>404</h1>
      <p className="return">Question does not exist. Back to </p><Link to='/'>Home</Link>
    </div>
  )
}


export default ErrorPage
