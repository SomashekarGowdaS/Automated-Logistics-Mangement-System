const vehiclesInitialState = [
    { registrationNumber: 'ka03jh8796', vehicleType: 'Truck', city: 'Mysore' },
    { registrationNumber: 'ka03yu5123', vehicleType: 'Bike', city: 'Mandya' }
];

export const vehiclesReducer = (state = vehiclesInitialState, action) => {
    switch (action.type) {
        case 'ADD_VEHICLE': {
            return [...state, action.payload];
        }

        default: {
            return [...state];
        }
    }
}