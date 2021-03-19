import React from 'react'
import AddVehicle from './AddVehicle'
import VehiclesList from './VehiclesList'

const VehiclesContainer = (props) => {
    return (
        <div>
            <VehiclesList />
            <AddVehicle />
        </div>
    )
}

export default VehiclesContainer