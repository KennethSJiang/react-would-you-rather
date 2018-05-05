import {showLoading, hideLoading} from 'react-redux-loading'
import {saveQuestionAnswer} from '../utils/api'
import {handleInitialData} from './shared'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT_QUESTION_ANSWER = 'SUBMIT_QUESTION_ANSWER'

export function receiveQuestions(questions){
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleSubmitQuestionAnswer(questionAnswer){
  return(dispatch) => {
    dispatch(showLoading)
    return saveQuestionAnswer(questionAnswer)
      .then(()=>{
        dispatch(updateQuestionAnswer(questionAnswer))
      }).then(()=>{
        dispatch(hideLoading())
      })
  }
}

function updateQuestionAnswer(questionAnswer){
  return {
    type: SUBMIT_QUESTION_ANSWER,
    questionAnswer
  }
}
