import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './styles.css'

const ItemsList = (props) => {
    const items = useSelector((state) => {
        return state.items;
    });
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const getItems = () => {
        const filteredItems = items.filter(item => item.itemName.toLowerCase().includes(searchText.toLowerCase()) || item.price.toString().includes(searchText));
        return filteredItems;
    }

    return (
        <div>
            <h1> Items List </h1>
            <input type="text" value={searchText} onChange={handleSearch} placeholder="Search" />
            { getItems().length === 0 ? (
                <p> No Items Available </p>
            ) : (
                <table id="tableStyle">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th> Price </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getItems().map(item => {
                            return <tr key={item.id} >
                                <td> {item.itemName} </td>
                                <td> {item.price} </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ItemsList