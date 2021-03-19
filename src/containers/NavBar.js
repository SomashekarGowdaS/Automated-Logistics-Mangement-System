import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {


    return (
        <div>
            <span> <Link to='/'> Home </Link> </span>
            <span> <Link to='/vehicles'> Vehicles </Link> </span>
            <span> <Link to='/items'> Items </Link> </span>
            <span> <Link to='/customers'> Customers </Link> </span>
            <span> <Link to='/orders'> Orders </Link> </span>
        </div>
    )
}

export default NavBar