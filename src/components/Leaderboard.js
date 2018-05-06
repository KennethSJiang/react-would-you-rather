import React, {Component} from 'react'
import {connect} from 'react-redux'

class Leaderboard extends Component{
  render(){
    const {users} = this.props
    let ranking = 1
    return(
      <ul>
        {
          users.map((user) => (
            <li key={user.id} className='question'>
              <div className='question-info'>
                <span>{ranking++}. {user.id}</span>
                <div className='replying-to'>answered {user.answered} questions / submitted {user.questions} questions</div>
              </div>
            </li>
          ))
        }
      </ul>
    )
  }
}

function mapStateToProps({users}){
  console.log(`Leaderboard user object: ${JSON.stringify(users)}`)
  const sortedUsers = Object.keys(users).map((userId) =>{
    return {id: userId, questions: users[userId].questions.length, answered: Object.keys(users[userId].answers).length}
  }).sort((userA, userB) => {
    return userB.questions + userB.answered - userA.questions - userA.answered
  })
  return{
    users: sortedUsers
  }
}

export default connect(mapStateToProps)(Leaderboard)
