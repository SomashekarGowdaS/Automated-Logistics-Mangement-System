import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './styles.css'

const VehiclesList = (props) => {
    const vehicles = useSelector((state) => {
        return state.vehicles;
    });
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const getVehicles = () => {
        const filteredVehicles = vehicles.filter(vehicle => vehicle.registrationNumber.toLowerCase().includes(searchText.toLowerCase()) || vehicle.vehicleType.toLowerCase().includes(searchText.toLowerCase()) || vehicle.city.toLowerCase().includes(searchText.toLowerCase()));
        return filteredVehicles;
    }

    return (
        <div>
            <h1> Vehicles List </h1>
            <input type="text" value={searchText} onChange={handleSearch} placeholder="Search" />
            { getVehicles().length === 0 ? (
                <p> No Vehicles Available </p>
            ) : (
                <table id="tableStyle" >
                    <thead>
                        <tr>
                            <th>Registration Number</th>
                            <th> Vehicle Type </th>
                            <th> City </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getVehicles().map(vehicle => {
                            return <tr key={vehicle.registrationNumber} >
                                <td> {vehicle.registrationNumber} </td>
                                <td> {vehicle.vehicleType} </td>
                                <td> {vehicle.city} </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default VehiclesList