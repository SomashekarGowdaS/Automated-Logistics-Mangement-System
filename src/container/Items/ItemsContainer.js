import React from 'react'
import AddItem from './AddItem'
import ItemsList from './ItemsList'

const ItemsContainer = (props) => {


    return (
        <div>
            <ItemsList />
            <AddItem />
        </div>
    )
}

export default ItemsContainer