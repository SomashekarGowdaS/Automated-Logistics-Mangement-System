import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const CustomersList = (props) => {
    const customers = useSelector((state) => {
        return state.customers;
    });
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const getCustomers = () => {
        const filteredCustomers = customers.filter(customer => {
            if (customer.customerName.toLowerCase().includes(searchText) || customer.city.toLowerCase().includes(searchText)) {
                return customer;
            }
        });
        return filteredCustomers;
    }

    return (
        <div>
            <input type="text" value={searchText} onChange={handleSearch} />
            { getCustomers().length === 0 ? (
                <p> No Customers Available </p>
            ) : (
                <table>
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