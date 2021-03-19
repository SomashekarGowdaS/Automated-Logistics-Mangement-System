import React from 'react'
import AddVehicle from './AddVehicle'
import VehiclesList from './VehiclesList'

const VehiclesContainer = (props) => {
    return (
        <div className="grid-container" >
            <div class="grid-item"> <VehiclesList /> </div>
            <div class="grid-item"> <AddVehicle /> </div>
        </div>
    )
}

export default VehiclesContainer