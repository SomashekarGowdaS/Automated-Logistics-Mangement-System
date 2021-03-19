import React from 'react'
import AddCustomer from './AddCustomer'
import CustomersList from './CustomersList'

const CustomersContainer = (props) => {


    return (
        <div>
            <CustomersList />
            <AddCustomer />
        </div>
    )
}

export default CustomersContainer