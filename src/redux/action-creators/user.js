import {
    reqLogin
} from '../../api';
import {
    GET_USER_SUCCESS,
    REMOVE_USER_SUCCESS
} from '../action-types/user';

const getUserSucces = (user) => ({
    type: GET_USER_SUCCESS,
    data: user
})
export const removeUserSuccess =() => ({
    type: REMOVE_USER_SUCCESS,
})

export const getUserAsync = (username, password) => {
    return (dispatch) => {
        return reqLogin(username, password)
            .then((response) => {
                const action = getUserSucces(response)
                dispatch(action);
                return response;
            })
    }
}