import { RECEIVE_USERS } from '../actions/users'

export default function users(state={}, action){
  switch(action.type){
    case RECEIVE_USERS:
      // console.log('RECEIVE_USERS with payload: ', action.users)
      return {
        ...state,
        ...action.users
      }
    default:
      return state
  }
}
