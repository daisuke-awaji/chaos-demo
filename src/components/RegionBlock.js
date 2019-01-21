import React from 'react';
import Grid from '@material-ui/core/Grid';
import CellAnime from './CellAnime';

class RegionBlock extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: 12, paddingBottom: 12 }}>
        <Grid style={{ backgroundColor: '#ffa144', zIndex: 100, textAlign: 'center', color: 'white', borderRadius: 5 }} item xs={6} sm={4} lg={2} xl={1}>
          {this.props.targetRegion}
        </Grid>
        <Grid
          container
          style={{ padding: 24, border: "thin solid #ffa144", borderRadius: 5 }}
          spacing={24}
        >
          {this.props.instances.map((instance, index) => (
            () => {
              if (instance.az === this.props.targetRegion) {
                return (
                  <Grid key={index} item xs={3} sm={2} lg={1} xl={1}>
                    <CellAnime key={index} instance={instance} />
                  </Grid>
                )
              }
            }
          )())}
        </Grid>

      </div>
    )
  }
}


export default RegionBlock;
