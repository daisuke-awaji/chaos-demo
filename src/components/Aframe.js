import React, { Component } from 'react'
import 'aframe'
import { Entity, Scene } from 'aframe-react'
import Box from './Box';

import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import AWS from 'aws-sdk'
AWS.config.update({
    "accessKeyId": process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    "region": process.env.REACT_APP_AWS_DEFAULT_REGION
})

const array = [

    { x: 0, y: 1, z: -3 },
    { x: -2, y: 1, z: -3 },
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

]

class Aframe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: [],
            color: 'red',
            maxNumberOfInstances: 0
        };
    }

    componentDidMount() {
        setInterval(() => { this.describeInstances() }, 2000);
        setInterval(() => { this.countLengthOfInstances() }, 5000);
    }

    countLengthOfInstances() {
        this.setState({ maxNumberOfInstances: this.state.instances.length });
    }

    describeInstances() {
        var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
        ec2.describeInstances(function (err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                let instances = [];
                data.Reservations.forEach(function (instanceList) {
                    instanceList.Instances.forEach(function (instance) {
                        let value = "";
                        // console.log(instance)
                        instance.Tags.forEach((tag) => {
                            if (tag.Key === "Name") {
                                value = tag.Value
                            }
                        })
                        let instanceData = {
                            instanceId: instance.InstanceId,
                            instanceType: instance.InstanceType,
                            tagValue: value,
                            state: instance.State.Name,
                            az: instance.Placement.AvailabilityZone
                        }
                        instances.push(instanceData);
                    })
                })
                // let testInstanceDataA = {
                //     instanceId: "test",
                //     instanceType: "t2medium",
                //     tagValue: "test",
                //     state: "terminate",
                //     az: "us-east-1a"
                // };
                // let testInstanceDataB = {
                //     instanceId: "test",
                //     instanceType: "t2medium",
                //     tagValue: "test",
                //     state: "terminate",
                //     az: "us-east-1b"
                // };
                // for (let i = 0; i < 5; i++) {
                //     instances.push(testInstanceDataA);
                //     instances.push(testInstanceDataB);
                // };
                this.setState({ instances: instances });
            }
        }.bind(this));
    }

    render() {
        return (
            <Scene>
                <a-assets>
                    <img alt="" id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
                    <img alt="" id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
                </a-assets>

                <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100" />
                <Entity primitive="a-light" type="ambient" color="#445451" />
                <Entity primitive="a-light" type="point" intensity="1" position="2 4 4" />
                <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048" />
                <Entity particle-system={{ preset: 'snow', particleCount: 10000 }} />
                <Entity text={{ value: 'Experience of Chaos Engineering!', align: 'center' }} position={{ x: 0, y: 2, z: -1 }} />

                {array.map((data, index) => {
                    if (index < this.state.maxNumberOfInstances) {
                        return <Box key={index} x={data.x} y={data.y} z={data.z} />;
                    } else {
                        return null;
                    }
                })}

                <Entity primitive="a-camera">
                    <Entity primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
                </Entity>
            </Scene>
        )
    }
}

export default Aframe;