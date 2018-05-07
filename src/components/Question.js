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
    const {question, authedUserId, questionAuthor } = this.props
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
        <div className='replying-to'>submitted by: {questionAuthor.id}</div>
        <img src={questionAuthor.avatarURL} alt={`Avatar of ${questionAuthor.id}`} className='avatar'/>
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, {id}){
  // console.log(`Question mapStateToProps called. ${users[questions[id]]}, ${id}`)
    return{
      question: questions[id],
      authedUserId: authedUser,
      questionAuthor: users[questions[id].author]
    }
}

export default connect(mapStateToProps)(Question)
