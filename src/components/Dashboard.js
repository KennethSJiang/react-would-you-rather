import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {handleSubmitQuestionAnswer} from '../actions/questions'
import {Link, withRouter} from 'react-router-dom'

class Dashboard extends Component{
  state ={
    showUnanswered: true
  }

  handleViewToggle = (e) =>{
    this.setState(() => ({
      showUnanswered: !this.state.showUnanswered
    }))
  }

  render(){
    const{ currentUser, answered, unanswered} = this.props

    return(
      <div className='center'>
        <span className='center'>UNANSWERED </span>
        <label className="switch">
          <input type="checkbox" value={this.state.showUnanswered} onChange={this.handleViewToggle} />
          <div className="slider"></div>
        </label>
        <span className='center'> ANSWERED</span>
        <ul>
        {
          (this.state.showUnanswered ? unanswered : answered).map((question)=>{
            return(
              <li key={question.id} className='question'>
                <Link to={`/question/${question.id}`}>
                Would you rather <u>{question.optionOne.text}</u> or <u>{question.optionTwo.text}</u>?
                </Link>
                {!this.state.showUnanswered &&
                  (<p className='replying-to'> You answered {
                    question.optionOne.votes.includes(currentUser.id) ?
                      question.optionOne.text : question.optionTwo.text}</p>)}
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(props){
  // console.log("Dashboard mapStateToProps called updated questions are " + JSON.stringify(props.questions))
  const {users, questions, authedUser} = props
  let currentUser = null
  const answered =[]
  const unanswered = []

  if(authedUser){
    currentUser = users[authedUser]
    Object.keys(questions).sort((a, b)=>{
      return questions[b].timestamp - questions[a].timestamp
    }).map((questionId) => {
      if(Object.keys(currentUser.answers).includes(questionId)){
        return answered.push(questions[questionId])
      } else {
        return unanswered.push(questions[questionId])
      }
    })
  }
  return { currentUser: currentUser, answered: answered, unanswered: unanswered }
}

export default withRouter(connect(mapStateToProps)(Dashboard))
