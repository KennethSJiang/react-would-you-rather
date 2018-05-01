import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions(questions){
  console.log("Questions action received " + JSON.stringify(questions))
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
