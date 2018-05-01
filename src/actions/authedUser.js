
export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id){
  console.log("SET authed user received " + id)
  return{
    type: SET_AUTHED_USER,
    id
  }
}
