import { createStore} from 'redux';
import { reducer } from './Reducers';

const initStates = {

};

const store = createStore(reducer, initStates);

export default store;