import Grid from '@material-ui/core/Grid';
import Cell from './Cell'
import React from 'react';
import NginxLink from './NginxLink'
import Button from '@material-ui/core/Button';
import EC2StatusDescription from './EC2StatusDescription';

import AWS from 'aws-sdk'
AWS.config.update({
  "accessKeyId": process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  "region": process.env.REACT_APP_AWS_DEFAULT_REGION
})

class Regions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instances: [],
      nginxEndpointUrl: "",
      nginxResponseCode: [200]
    }
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
        this.setState({ instances: instances });
      }
    }.bind(this));
  }

  getNginxEndpointUrl() {
    var elbv2 = new AWS.ELBv2();
    elbv2.describeLoadBalancers(function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        let loadBalancers = data.LoadBalancers
        if (loadBalancers.length !== 0) {
          this.setState({ nginxEndpointUrl: loadBalancers[0].DNSName })
          return loadBalancers[0].DNSName
        }
      }
    }.bind(this));
  }

  getNginxResponse(url) {
    if (url) {
      fetch(url)
    } else {
      return
    }
  }

  clickRunChaosLambdaButton() {
    fetch('https://4uj77b30f4.execute-api.us-east-1.amazonaws.com/Prod/chaos-lambda/delete')
  }

  componentWillMount() {
    this.describeInstances();
    let nginxEndpoint = this.getNginxEndpointUrl();
    this.getNginxResponse(nginxEndpoint);
  };

  componentDidMount() {
    setInterval(() => { this.describeInstances() }, 1000);
    // setInterval(() => {this.getNginxEndpointStatus(this.state.nginxEndpointUrl)}, 1000);
  }

  getNginxEndpointStatus(url) {
    var statuses = this.state.nginxResponseCode.concat();
    // console.log(url);
    url = 'http://' + url;
    fetch(url) // 404 (Not Found)
      .then(response => {
        // console.log(response.status);
        statuses.push(response.status);
        this.setState({ nginxResponseCode: statuses });
        return response.text();
      })
      .then(text => {
        // console.log(text);
      })
      .catch(e => {
        statuses.push(503);
        this.setState({ nginxResponseCode: statuses });
        console.log(e.message); // エラーです！
      });
  }

  render() {
    return (

      <div style={{ padding: 24 }}>
        <Grid
          container
          style={{ paddingBottom: 24 }}
          spacing={24}
        >
          <Button disabled={this.state.instances.length < 2} size="medium" key="run-chaos-lambda-button" color="secondary" variant="outlined" onClick={() => this.clickRunChaosLambdaButton()}>
            <span role="img" aria-label="bolt">⚡️</span> Chaos Lambda <span role="img" aria-label="bolt">⚡️</span>
          </Button>
          <span>　</span>
          <NginxLink nginxEndpointUrl={this.state.nginxEndpointUrl} />
        </Grid>

        <Grid style={{ backgroundColor: '#ffa144', zIndex: 100, textAlign: 'center', color: 'white', borderRadius: 5 }} item xs={6} sm={4} lg={2} xl={1}>
          us-east-1a
        </Grid>
        <Grid
          container
          style={{ padding: 24, border: "thin solid #ffa144", borderRadius: 5 }}
          spacing={24}
        >
          {this.state.instances.map((instance, index) => (
            () => {
              if (instance.az === "us-east-1a") {
                return (
                  <Grid key={index} item xs={3} sm={2} lg={1} xl={1}>
                    <Cell key={index} instance={instance} />
                  </Grid>
                )
              }
            }
          )())}
        </Grid>

        <Grid container style={{ padding: 24 }} spacing={24} />

        <Grid style={{ backgroundColor: '#ffa144', zIndex: 100, textAlign: 'center', color: 'white', borderRadius: 5 }} item xs={6} sm={4} lg={2} xl={1}>
          us-east-1b
        </Grid>
        <Grid
          container
          style={{ padding: 24, border: "thin solid #ffa144", borderRadius: 5 }}
          spacing={24}
        >
          {this.state.instances.map((instance, index) => (
            () => {
              if (instance.az === "us-east-1b") {
                return (
                  <Grid key={index} item xs={3} sm={2} lg={1} xl={1}>
                    <Cell key={index} instance={instance} />
                  </Grid>
                )
              }
            }
          )())}
        </Grid>

        <Grid container style={{ padding: 24 }} spacing={24} />

        <EC2StatusDescription />

        {/* <Chart data={this.state.nginxResponseCode} /> */}
      </div>
    );
  }
}

export default Regions;
