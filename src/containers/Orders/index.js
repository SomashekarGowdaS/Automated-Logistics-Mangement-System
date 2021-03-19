import React from 'react'
import OrdersList from './OrdersList'
import AddOrder from './AddOrder'

const OrdersContainer = (props) => {


    return (
        <div>
            <OrdersList />
            <AddOrder />
        </div>
    )
}

export default OrdersContainer