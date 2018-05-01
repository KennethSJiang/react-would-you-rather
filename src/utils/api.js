import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => {
      return {
        users,
        questions,
      }
  }
)
}

export function saveQuestionAnswer (questionAnswer) {
  return _saveQuestionAnswer(questionAnswer)
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}
