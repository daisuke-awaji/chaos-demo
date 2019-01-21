import React from 'react';
import Grid from '@material-ui/core/Grid';
import Cell from './Cell'

class EC2StatusDescription extends React.Component {
    render() {
        return (
            <Grid container style={{ paddingTop: 0 }} spacing={24}>
                <Grid item xs={3} sm={2} lg={2} xl={2}>
                    <Cell instance={{
                        instanceId: "",
                        instanceType: "",
                        tagValue: "",
                        state: "running",
                        az: ""
                    }} />
                    <span style={{ fontSize: 12 }}>running</span>
                </Grid>
                <Grid item xs={3} sm={2} lg={2} xl={2}>
                    <Cell instance={{
                        instanceId: "",
                        instanceType: "",
                        tagValue: "",
                        state: "terminated",
                        az: ""
                    }} />
                    <span style={{ fontSize: 12 }}>terminated</span>
                </Grid>
                <Grid item xs={3} sm={2} lg={2} xl={2}>
                    <Cell instance={{
                        instanceId: "",
                        instanceType: "",
                        tagValue: "",
                        state: "shutting-down",
                        az: ""
                    }} />
                    <span style={{ fontSize: 12 }}>shutting-down</span>
                </Grid>
                <Grid item xs={3} sm={2} lg={2} xl={2}>
                    <Cell instance={{
                        instanceId: "",
                        instanceType: "",
                        tagValue: "",
                        state: "pending",
                        az: ""
                    }} />
                    <span style={{ fontSize: 12 }}>pending</span>
                </Grid>
            </Grid>
        )
    }
}


export default EC2StatusDescription;
