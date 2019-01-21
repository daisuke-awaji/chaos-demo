import React from 'react';
import Button from '@material-ui/core/Button';

class NginxLink extends React.Component {
  render() {
    return (
      <Button disabled={!this.props.nginxEndpointUrl} size="medium" key="link" variant="outlined" href={this.props.nginxEndpointUrl ? "http://" + this.props.nginxEndpointUrl : ""}>
        Go To Nginx
      </Button>
    )
  }
}


export default NginxLink;
