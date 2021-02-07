import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import preloader from './preloader'
import choosePage from './choosePage'
import changePage from './changePage'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    preloader,
    choosePage,
    changePage
});

export default rootReducer