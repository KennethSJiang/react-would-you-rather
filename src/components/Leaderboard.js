import React, {Component} from 'react'
import {connect} from 'react-redux'

const Leaderboard = ({users}) => {
  let ranking = 1
  return(
    <ul>
      {
        users.map((user) => {
          const {userId, avatar, answered, name, questions} = user
          return(
            <li key={userId} className='question'>
            <div className='question-info'>
              <img src={avatar} alt={`Avatar of ${userId}`} className='avatar'/>
              <span>{ranking++}. {name}</span>
              <div className='replying-to'>answered {answered} questions / submitted {questions} questions</div>
            </div>
            </li>
          )
        })
      }
    </ul>
  )
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
