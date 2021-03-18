import React from 'react'
import { useSelector } from 'react-redux'

const VehiclesList = (props) => {
    const vehicles = useSelector((state) => {
        return state.vehicles;
    })

    return (
        <div>
            { vehicles.length === 0 ? (
                <p> No Vehicles Available </p>
            ) : (
                <ul>
                    { vehicles.map(vehicle => {
                        return <li key={vehicle.id} > { vehicle.registrationNumber } - { vehicle.vehicleType } - { vehicle.city } </li>
                    }) }
                </ul>
            ) }
        </div>
    )
}

export default VehiclesList