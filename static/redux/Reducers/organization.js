import { LOADING, FINISH, RESET } from '../Actions/organization'

const initialState = {
    loggedIn: null,
    loading: false
};

//reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, ...action.data };
        case FINISH:
            return { ...state, ...action.data }
        case RESET:
            return { ...initialState }
        default:
            return state;
    }
};