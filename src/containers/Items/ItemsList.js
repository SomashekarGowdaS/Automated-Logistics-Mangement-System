import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ItemsList = (props) => {
    const items = useSelector((state) => {
        return state.items;
    });
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const getItems = () => {
        const filteredItems = items.filter(item => {
            if (item.itemName.toLowerCase().includes(searchText.toLowerCase()) || item.price.toString().includes(searchText)) {
                return item;
            }
        });
        return filteredItems;
    }

    return (
        <div>
            <input type="text" value={searchText} onChange={handleSearch} />
            { getItems().length === 0 ? (
                <p> No Items Available </p>
            ) : (
                <table>
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