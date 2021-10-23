import { createStore, combineReducers } from 'redux';
import Reducer from './reducer/reducer';


const rootReducer = combineReducers({
    data: Reducer
})


const store = createStore(rootReducer);

export default store;