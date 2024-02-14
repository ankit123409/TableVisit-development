import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Reducer } from './Reducer';
const middleware = applyMiddleware(thunk);
export const store = createStore(Reducer, middleware);
