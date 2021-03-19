import React from 'react'
import OrdersList from './OrdersList'
import AddOrder from './AddOrder'

const OrdersContainer = (props) => {


    return (
        <div className="grid-container" >
            <div class="grid-item"> <OrdersList /> </div>
            <div class="grid-item"> <AddOrder /> </div>
        </div>
    )
}

export default OrdersContainer