import { RECEIVE_USERS } from '../actions/users'
import { SUBMIT_QUESTION_ANSWER } from '../actions/questions'

export default function users(state={}, action){
  switch(action.type){
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SUBMIT_QUESTION_ANSWER:
      const {authedUser, qid, answer} = action.questionAnswer
      const answers = {}
      Object.keys(state[authedUser].answers).filter((key) => {
        if(key !== qid){
          answers[key] = state[authedUser].answers[key]
        }
      })
      answers[qid] = answer
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers
        }
      }
    default:
      return state
  }
}
