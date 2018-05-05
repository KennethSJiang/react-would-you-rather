import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSubmitQuestionAnswer} from '../actions/questions'

class Question extends Component{
  handleQuestionAnswer = (event, answer) => {
    event.preventDefault()
    const {dispatch, question, authedUserId} = this.props
    dispatch(handleSubmitQuestionAnswer({ authedUser: authedUserId, qid: question.id, answer: answer }))
  }

  render(){
    const {question, authedUserId } = this.props
    let optionOneColor = question.optionOne.votes.includes(authedUserId) ? '#808080' : '#ffffff'
    let optionTwoColor = question.optionTwo.votes.includes(authedUserId) ? '#808080' : '#ffffff'

    return(
      <div className='question'>
        <div className='center'>
        <div className='question-info'>
          <span>WOULD YOU RATHER ID: {question.id}</span>
          <span
            onClick={(event) => this.handleQuestionAnswer(event, 'optionOne')}
            className='question'
            style={{backgroundColor:`${optionOneColor}`}}>{question.optionOne.text}/{question.id}</span>
          <span>OR</span>
          <span
            onClick={(event) => this.handleQuestionAnswer(event, 'optionTwo')}
            className='question'
            style={{backgroundColor:`${optionTwoColor}`}}>{question.optionTwo.text}/{question.id}</span>
        </div>
        <div className='replying-to'>submitted by: {question.author}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, authedUser}, {id}){
  console.log("Question mapStateToProps called")
    return{
      qt: questions[id],
      authedUserId: authedUser
    }
}

export default connect()(Question)
