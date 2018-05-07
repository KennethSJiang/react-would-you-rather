import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SET_USER = 'SET_USER'

export function receiveUsers(users){
  return{
    type: RECEIVE_USERS,
    users
  }
}

export function selectUser(id){
  return{
    type: SET_USER,
    id
  }
}
