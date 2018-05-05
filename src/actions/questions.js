import {showLoading, hideLoading} from 'react-redux-loading'
import {saveQuestionAnswer, saveQuestion} from '../utils/api'
import {handleInitialData} from './shared'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT_QUESTION_ANSWER = 'SUBMIT_QUESTION_ANSWER'
export const CREATE_NEW_QUESTION = 'CREATE_NEW_QUESTION'

export function receiveQuestions(questions){
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleNewQuestion(question){
  return(dispatch) => {
    dispatch(showLoading())
    return saveQuestion(question)
      .then((question) =>{
        dispatch(createNewQuestion(question))
      }).then(()=>{
        dispatch(hideLoading())
      })
  }
}

export function handleSubmitQuestionAnswer(questionAnswer){
  return(dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer(questionAnswer)
      .then(()=>{
        dispatch(updateQuestionAnswer(questionAnswer))
      }).then(()=>{
        dispatch(hideLoading())
      })
  }
}

function createNewQuestion(formattedQuestion){
  return {
    type: CREATE_NEW_QUESTION,
    formattedQuestion
  }
}

function updateQuestionAnswer(questionAnswer){
  return {
    type: SUBMIT_QUESTION_ANSWER,
    questionAnswer
  }
}
