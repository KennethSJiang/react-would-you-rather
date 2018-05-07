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
                <img src={user.avatar} alt={`Avatar of ${user.id}`} className='avatar'/>
                <span>{ranking++}. {user.name}</span>
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
  const sortedUsers = Object.keys(users).map((userId) =>{
    return {id: userId, name: users[userId].name, avatar: users[userId].avatarURL, questions: users[userId].questions.length, answered: Object.keys(users[userId].answers).length}
  }).sort((userA, userB) => {
    return userB.questions + userB.answered - userA.questions - userA.answered
  })

  return{
    users: sortedUsers
  }
}

export default connect(mapStateToProps)(Leaderboard)
