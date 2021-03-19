const vehiclesInitialState = [
    { registrationNumber: 'ka03jh8796', vehicleType: 'Truck', city: 'Mysore', availability: true },
    { registrationNumber: 'ka03yu5123', vehicleType: 'Bike', city: 'Mandya', availability: true },
    { registrationNumber: 'ka02ki5896', vehicleType: 'Bike', city: 'Tumkur', availability: true },
    { registrationNumber: 'ka52ia8963', vehicleType: 'Truck', city: 'Hassan', availability: true },
    { registrationNumber: 'ka89ka4521', vehicleType: 'Bike', city: 'Mandya', availability: true }
];

export const vehiclesReducer = (state = vehiclesInitialState, action) => {
    switch (action.type) {
        case 'ADD_VEHICLE': {
            return [...state, action.payload];
        }
        case 'UPDATE_VEHICLES': {
            return [...action.payload];
        }
        default: {
            return [...state];
        }
    }
}