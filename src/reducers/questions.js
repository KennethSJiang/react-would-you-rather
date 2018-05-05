import { RECEIVE_QUESTIONS, CREATE_NEW_QUESTION, SUBMIT_QUESTION_ANSWER } from '../actions/questions'

export default function questions(state={}, action){
  switch(action.type){
    case RECEIVE_QUESTIONS:
      // console.log("Questions Reducer received RECEIVE_QUESTIONS: " + JSON.stringify(action))
      return {
        ...state,
        ...action.questions
      }
    case CREATE_NEW_QUESTION:
      return {
        ...state,
        [action.formattedQuestion.id]: action.formattedQuestion
      }
    case SUBMIT_QUESTION_ANSWER:
      // console.log("Questions Reducer received SUBMIT_QUESTION_ANSWER: " + JSON.stringify(action))
      const {authedUser, qid, answer} = action.questionAnswer
      let optionOne = state[qid].optionOne
      let optionTwo = state[qid].optionTwo
      if(answer === 'optionOne'){
        optionOne = {
          ...optionOne,
          votes: [...optionOne.votes.concat([authedUser])]
        }
        optionTwo = {
          ...optionTwo,
          votes: [...optionTwo.votes.filter((authorId) => authorId !== authedUser)]
        }
      }
      if(answer === 'optionTwo'){
        optionOne = {
          ...optionOne,
          votes: [...optionOne.votes.filter((authorId) => authorId !== authedUser)]
        }

        optionTwo = {
          ...optionTwo,
          votes: [...optionTwo.votes.concat([authedUser])]
        }
      }

      const option={
        ...state[qid],
        optionOne,
        optionTwo
      }
      return {
        ...state,
        [qid]:option
      }
    default:
      return state
  }
}
