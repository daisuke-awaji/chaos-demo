import React, { Component } from 'react'
import 'aframe'
import { Animation, Entity, Scene, } from 'aframe-react'

class Aframe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            degree: 90,
            position: "0 10 30",
            rotation: "0 90 0",
            rotationY: 90,
        }

        this.rotate = this.rotate.bind(this)
    }

    componentDidMount() {
        this.rotate()
    }

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle)
            this.frameHandle = null
        }
    }

    rotate() {
        let newDegree = this.state.degree + 0.1
        if (newDegree >= 360) {
            newDegree -= 360
        }

        const afterX = 50 * Math.cos(newDegree * (Math.PI / 180));
        const afterZ = 50 * Math.sin(newDegree * (Math.PI / 180));

        let newRotationY = this.state.rotationY - 0.1
        if (newRotationY <= -360) {
            newRotationY += 360
        }

        this.setState({
            degree: newDegree,
            position: `${afterX} 0 ${afterZ}`,
            rotation: `${afterZ} ${newRotationY} ${afterX}`,
            rotationY: newRotationY,
        });
        this.frameHandle = requestAnimationFrame(this.rotate)
    }

    render() {
        return (
            <Scene>
                <Entity primitive='a-sky' src='[360度画像]' />
                <Entity primitive='a-sphere' color="green" position="-2 10 -3" />
                <Entity geometry={{ primitive: 'box', width: 5 }} position="0 0 -5" />
                <Entity rotation={this.state.rotation}>
                    <Entity primitive='a-camera' position={this.state.position} />
                </Entity>
            </Scene>
        )
    }
}

export default Aframe;