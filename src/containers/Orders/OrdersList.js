import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './styles.css';

const OrdersList = (props) => {
    const orders = useSelector((state) => {
        return state.orders;
    });
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const getOrders = () => {
        const filteredOrders = orders.filter(order => {
            if (order.orderId.toLowerCase().includes(searchText) || order.customerId.toLowerCase().toLowerCase().includes(searchText)) {
                return order;
            }
        });
        return filteredOrders;
    }

    return (
        <div>
            <h1> Orders List </h1>
            <input type="text" value={searchText} onChange={handleSearch} placeholder="Search" />
            { getOrders().length === 0 ? (
                <p> No Orders Available </p>
            ) : (
                <table id="tableStyle">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th> Customer Id </th>
                            <th> Delivery Vehicle Id </th>
                            <th> Items </th>
                            <th> Price </th>
                            <th> Delivery Location </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getOrders().map(order => {
                            return <tr key={order.orderId} >
                                <td> {order.orderId} </td>
                                <td> {order.customerId} </td>
                                <td> {order.vehicleId} </td>
                                <td> {order.items.map(item => item.itemName).join(',')} </td>
                                <td> {order.totalPrice} </td>
                                <td> {order.deliveryLocation} </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OrdersList