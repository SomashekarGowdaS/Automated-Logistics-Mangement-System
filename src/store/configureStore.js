import { createStore, combineReducers } from 'redux'
import { customersReducer } from '../reducers/customersReducer';
import { itemsReducer } from '../reducers/itemsReducer';
import ordersReducer from '../reducers/ordersReducer';
import { vehiclesReducer } from '../reducers/vehiclesReducer';

const configureStore = () => {
    const store = createStore(combineReducers({
        vehicles: vehiclesReducer,
        items: itemsReducer,
        customers: customersReducer,
        orders: ordersReducer
    }));
    return store;
}

export default configureStore