import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSubmitQuestionAnswer} from '../actions/questions'

class Question extends Component{
  handleQuestionAnswer = (event, answer) => {
    event.preventDefault()
    const {dispatch, question, currentUser} = this.props
    if(Object.keys(currentUser.answers).includes(question.id)){
      alert("You cannot change your poll!")
    } else {
      dispatch(handleSubmitQuestionAnswer({ authedUser: currentUser.id, qid: question.id, answer: answer }))
    }
  }

  render(){
    const {question, currentUser, questionAuthor, totalUsers} = this.props
    let optionOneColor = question.optionOne.votes.includes(currentUser.id) ? '#808080' : '#ffffff'
    let optionTwoColor = question.optionTwo.votes.includes(currentUser.id) ? '#808080' : '#ffffff'

    return(
      <div className='question'>
        <div className='center'>
        <div className='question-info'>
          <span>WOULD YOU RATHER</span>
          <div
            onClick={(event) => this.handleQuestionAnswer(event, 'optionOne')}
            className='question'
            style={{backgroundColor:`${optionOneColor}`}}>{question.optionOne.text}
            {
              Object.keys(currentUser.answers).includes(question.id) && (
                <div>{question.optionOne.votes.length} user(s)
                ({totalUsers === 0 ? 0 : (question.optionOne.votes.length/totalUsers).toFixed(2)}%)
                voted this option</div>
              )
            }
          </div>
          <span>OR</span>
          <div
            onClick={(event) => this.handleQuestionAnswer(event, 'optionTwo')}
            className='question'
            style={{backgroundColor:`${optionTwoColor}`}}>{question.optionTwo.text}
            {
              Object.keys(currentUser.answers).includes(question.id) && (
                <div>{question.optionTwo.votes.length} user(s)
                ({totalUsers === 0 ? 0 : (question.optionTwo.votes.length/totalUsers).toFixed(2)}%)
                voted this option</div>
              )
            }
          </div>
        </div>
        <div className='replying-to'>submitted by: {questionAuthor.id}</div>
        <img src={questionAuthor.avatarURL} alt={`Avatar of ${questionAuthor.id}`} className='avatar'/>
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, props){
  // console.log(`Question mapStateToProps called. ${users[questions[id]]}, ${id}`)
    const {id} = props.match.params
    return{
      question: questions[id],
      totalUsers: Object.keys(users).length,
      currentUser: users[authedUser],
      questionAuthor: users[questions[id].author]
    }
}

export default connect(mapStateToProps)(Question)
