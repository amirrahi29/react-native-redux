import {createStore} from 'redux';
import rootRed from './src/redux/reducers/main';

const store = createStore(
    rootRed
);

export default store;