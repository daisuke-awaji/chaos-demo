import React, { Component } from 'react'
import 'aframe'
import { Entity } from 'aframe-react'

import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

class Aframe extends Component {
    constructor(props) {
        super(props);
        this.state = { color: '#ba5600' };
    }

    changeColor() {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
        this.setState({
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    render() {
        return (
            <Entity id="box"
                geometry={{ primitive: 'box' }}
                material={{ color: this.state.color, opacity: 1.0 }}
                animation__rotate={{ property: 'rotation', dur: 5000, loop: true, to: '360 360 360' }}
                position={{ x: this.props.x, y: this.props.y, z: this.props.z }}
                events={{ click: this.changeColor.bind(this) }}>
            </Entity>
        )
    }
}

export default Aframe;