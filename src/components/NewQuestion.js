import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {handleNewQuestion} from '../actions/questions'

class NewQuestion extends Component{
  state ={
      optionOne: '',
      optionTwo: '',
      toHome: false
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const {dispatch, author} = this.props
    const {optionOne, optionTwo} = this.state
    dispatch(handleNewQuestion({optionOneText: optionOne, optionTwoText: optionTwo, author: author}))
    this.setState(()=>({
      optionOne: '',
      optionTwo: '',
      toHome: true
    }))
  }

  handleChange =(e, option)=>{
    const text = e.target.value
    this.setState(()=>({
      [option]: text,
      toHome: false
    }))
  }

  render(){
    const {optionOne, optionTwo, toHome} = this.state
    if(toHome){
        return <Redirect to='/' />
    }

    return(
      <div>
        <h3 className='center'>Create New Question</h3>
        <p className='center'>Would You Rather</p>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea placeholder="Option A"
          value={optionOne}
          className='textarea'
          onChange={(e) => this.handleChange(e, 'optionOne')}
          maxLength={128}/>
          <p className='center'>OR</p>
          <textarea placeholder="Option B"
            value={optionTwo}
            className='textarea'
            onChange={(e) => this.handleChange(e, 'optionTwo')}
            maxLength={128}/>
          <button
            className='btn'
            type='submit'
            disabled={optionOne==='' || optionTwo === ''}
          >
          Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser}){
  return {
    author: authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
