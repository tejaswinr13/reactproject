import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk';

const createReduxStore = () => {
    return createStore(reducers, applyMiddleware(thunk));
};

export default createReduxStore;