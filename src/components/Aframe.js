import React, { Component } from 'react'
import 'aframe'
import { Entity, Scene, } from 'aframe-react'
import Box from './Box';

import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

const array = [
    { x: -2, y: 1, z: 3 },
    { x: 0, y: 1, z: 3 },
    { x: 2, y: 1, z: 3 },
    { x: -2, y: 3, z: 3 },
    { x: 0, y: 3, z: 3 },
    { x: 2, y: 3, z: 3 },

    { x: -2, y: 1, z: 1 },
    { x: 0, y: 1, z: 1 },
    { x: 2, y: 1, z: 1 },
    { x: -2, y: 3, z: 1 },
    { x: 0, y: 3, z: 1 },
    { x: 2, y: 3, z: 1 },

    { x: -2, y: 1, z: -1 },
    // { x: 0, y: 1, z: -1 },
    { x: 2, y: 1, z: -1 },
    { x: -2, y: 3, z: -1 },
    { x: 0, y: 3, z: -1 },
    { x: 2, y: 3, z: -1 },

    { x: -2, y: 1, z: -3 },
    { x: 0, y: 1, z: -3 },
    { x: 2, y: 1, z: -3 },
    { x: -2, y: 3, z: -3 },
    { x: 0, y: 3, z: -3 },
    { x: 2, y: 3, z: -3 },

    { x: -2, y: 1, z: -5 },
    { x: 0, y: 1, z: -5 },
    { x: 2, y: 1, z: -5 },
    { x: -2, y: 3, z: -5 },
    { x: 0, y: 3, z: -5 },
    { x: 2, y: 3, z: -5 },
]

class Aframe extends Component {
    constructor(props) {
        super(props);
        this.state = { color: 'red' };
    }

    render() {
        return (
            <Scene>
                <a-assets>
                    <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
                    <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
                </a-assets>

                <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100" />
                <Entity primitive="a-light" type="ambient" color="#445451" />
                <Entity primitive="a-light" type="point" intensity="2" position="2 4 4" />
                <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048" />
                <Entity particle-system={{ preset: 'snow', particleCount: 100000 }} />
                <Entity text={{ value: 'Experience of Chaos Engineering!', align: 'center' }} position={{ x: 0, y: 2, z: -1 }} />

                {array.map((data) => {
                    return <Box x={data.x} y={data.y} z={data.z} />;
                })}

                <Entity primitive="a-camera">
                    <Entity primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
                </Entity>
            </Scene>
        )
    }
}

export default Aframe;