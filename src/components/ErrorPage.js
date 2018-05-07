import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class ErrorPage extends Component{
  state={
    toHome: false
  }

  handleClick = (e) =>{
    e.preventDefault()
    this.setState(()=>({
      toHome: true
    }))
  }

  render(){
    if(this.state.toHome){
      return <Redirect to='/' />
    }

    return(
      <div className="error-container">
        <h1>404</h1>
        <p className="return">Question does not exist. Back to </p><div className='replying-to' onClick={(e) => this.handleClick(e)}>Home Dashboard</div>
      </div>
    )
  }
}

export default ErrorPage
