import {
    GET_USER_SUCCESS
} from '../action-types/user';

function user(prevstate = {}, action) {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return action.data;
            default:
                return prevstate
    }
}
export default user;