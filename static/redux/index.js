import { combineReducers } from 'redux';
import admin from './Reducers/admin'
import organization from './Reducers/organization'
import item from './Reducers/item'
import history from './Reducers/history'

export default combineReducers({
    admin, organization, item, history
});