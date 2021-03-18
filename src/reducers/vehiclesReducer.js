const vehiclesInitialState = [];

const vehiclesReducer = (state = vehiclesInitialState, action) => {
    switch(action.type) {
        case 'ADD_VEHICLE': {
            return [...state, action.payload];
        }

        default: {
            return [...state];
        }
    }
}

export default vehiclesReducer