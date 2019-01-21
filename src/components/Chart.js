import { LineChart, XAxis, YAxis, Line } from 'recharts';
import React from 'react';
import Grid from '@material-ui/core/Grid';

class Chart extends React.Component {

  render() {
    let data = [];
    this.props.data.forEach(function (d) {
      data.push({ 'uv': d });
    });
    return (
      <div>
        <Grid style={{ backgroundColor: '#1abf30', zIndex: 100, textAlign: 'center', color: 'white', borderRadius: 5 }} item xs={6} sm={4} lg={2} xl={1}>
          <span>Nginx Response</span>
        </Grid>
        <LineChart width={window.innerWidth * 0.8} height={300} data={data}>
          <XAxis />
          <YAxis type="category" mirror={true} width={10} />
          <Line activeDot={{ stroke: '#1abf30', strokeWidth: 2, r: 10 }} dot={{ stroke: '#1abf30', strokeWidth: 2 }} type="monotone" dataKey="uv" stroke="#1abf30" />
        </LineChart>
      </div>
    )
  }
}

export default Chart;
