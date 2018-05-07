import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {handleSubmitQuestionAnswer} from '../actions/questions'

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
    console.log("Dashboard rendering SHOW: ", JSON.stringify(this.state.showUnanswered))
    return(
      <div className='center'>
        <span className='center'>UNANSWERED - </span>
        <label className="switch">
          <input type="checkbox" value={this.state.showUnanswered} onChange={this.handleViewToggle} />
          <div className="slider"></div>
        </label>
        <span className='center'> - ANSWERED</span>
        <ul>
        {
          (this.state.showUnanswered ? unanswered : answered).map((question)=>{
            return(<li key={question.id}>
              <Question id={question.id}/>
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
