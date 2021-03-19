import React from 'react'
import AddCustomer from './AddCustomer'
import CustomersList from './CustomersList'

const CustomersContainer = (props) => {


    return (
        <div className="grid-container" >
            <div class="grid-item"> <CustomersList /> </div>
            <div class="grid-item"> <AddCustomer /> </div>
        </div>
    )
}

export default CustomersContainer