import React from 'react';
import { flash } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import './home.css'

const styles = {
    flash: {
        animation: 'x 1s',
        animationName: Radium.keyframes(flash, 'flash')
    }
}

const Home = (props) => {
    return (
        <div className="center">
            <StyleRoot>
                <p style={styles.flash}>Welcome to Logistics system.</p>
            </StyleRoot>
        </div>
    )
}

export default Home