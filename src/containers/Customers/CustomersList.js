import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './styles.css';

const CustomersList = (props) => {
    const customers = useSelector((state) => {
        return state.customers;
    });
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const getCustomers = () => {
        const filteredCustomers = customers.filter(customer => customer.customerName.toLowerCase().includes(searchText) || customer.city.toLowerCase().includes(searchText));
        return filteredCustomers;
    }

    return (
        <div>
            <h1> Customers List </h1>
            <input type="text" value={searchText} onChange={handleSearch} placeholder="Search" />
            { getCustomers().length === 0 ? (
                <p> No Customers Available </p>
            ) : (
                <table id="tableStyle" >
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th> City </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCustomers().map(customer => {
                            return <tr key={customer.id} >
                                <td> {customer.customerName} </td>
                                <td> {customer.city} </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CustomersList