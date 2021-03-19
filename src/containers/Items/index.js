import React from 'react'
import AddItem from './AddItem'
import ItemsList from './ItemsList'

const ItemsContainer = (props) => {


    return (
        <div className="grid-container" >
            <div class="grid-item"> <ItemsList /> </div>
            <div class="grid-item"> <AddItem /> </div>
        </div>
    )
}

export default ItemsContainer