
export const addVehicle = (vehicle) => {
    return {
        type: 'ADD_VEHICLE',
        payload: vehicle
    }
}

export const updateVehicles = (vehicles) => {
    return {
        type: 'UPDATE_VEHICLES',
        payload: vehicles
    }
}