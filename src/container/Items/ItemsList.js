import React from 'react'
import { useSelector } from 'react-redux'

const ItemsList = (props) => {
    const items = useSelector((state) => {
        return state.items;
    })

    return (
        <div>
            { items.length === 0 ? (
                <p> No Items Available </p>
            ) : (
                <ul>
                    { items.map(item => {
                        return <li key={item.id} > { item.itemName } - { item.price } </li>
                    }) }
                </ul>
            ) }
        </div>
    )
}

export default ItemsList