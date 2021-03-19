import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css';

const NavBar = (props) => {
    return (
        <div>
            <ul>
                <li> <Link to='/'> Home </Link> </li>
                <li> <Link to='/vehicles'> Vehicles </Link> </li>
                <li> <Link to='/items'> Items </Link> </li>
                <li> <Link to='/customers'> Customers </Link> </li>
                <li> <Link to='/orders'> Orders </Link> </li>
            </ul>
        </div>
    )
}

export default NavBar