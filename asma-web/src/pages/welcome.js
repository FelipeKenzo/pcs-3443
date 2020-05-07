import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class welcome extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<div>
        <Grid containter>
            <Grid item>
                <Link href="login" variant="body2">
                    {"Login"}
                </Link>
            </Grid>
        </Grid>
        </div>);
    }
}

export default welcome;