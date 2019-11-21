import { reqlogin } from '../../api';
import { GET_USER_SUCCESS } from '../action-types/user';

const getUserSucces = (user) => ({
    type: GET_USER_SUCCESS,
    data: user
})

export const getUserAsync = (username, password) => {
  return (dispatch) => {
      return reqlogin(username, password)
      .then ((response)=> {
          const action = getUserSucces(response)
          dispatch(action);
      })
  }
}