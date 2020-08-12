import { LOADING, FINISH, RESET } from '../Actions/history'

const initialState = {
    histories: null,
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