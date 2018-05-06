import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {handleSubmitQuestionAnswer} from '../actions/questions'

class Dashboard extends Component{
  render(){
    const{ currentUser, answered, unanswered} = this.props
    // console.log("Dashboard rendering: ", JSON.stringify(unanswered))
    return(
      <div>
        <h3 className='center'>Unanswered</h3>
        <ul>
        {
          unanswered.map((question)=>{
            return(<li key={question.id}>
              <Question id={question.id}/>
            </li>)
          })
        }
        </ul>
        <hr/>
        <h3 className='center'>Answered</h3>
        <ul>
        {
          answered.map((question)=>{
            return(<li key={question.id}>
              <Question id={question.id} />
            </li>)
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

export default connect(mapStateToProps)(Dashboard)
