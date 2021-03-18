import { createStore, combineReducers } from 'redux'
import itemsReducer from '../reducers/itemsReducer';
import vehiclesReducer from '../reducers/vehiclesReducer';

const configureStore = () => {
    const store = createStore(combineReducers({
        vehicles: vehiclesReducer,
        items: itemsReducer
    }));
    return store;
}

export default configureStore