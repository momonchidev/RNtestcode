import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// import reducer from './../redux/reducer'

// // Connect our store to the reducers
// export default createStore(reducer, applyMiddleware(thunk));

import customerReducer from '../redux/customerReducer';
const store = createStore(customerReducer);
export default store;