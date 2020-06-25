import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: "75vh",
      },
      toolbar: theme.mixins.toolbar,
      uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '20px',
		width: '20px',
		left: '50%',
		top: '35%'
	},
}));

export default function Statistics(props) {
    const classes = useStyles();
    const [data, setData] = React.useState([]);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { authorization: `${authToken}` };
        axios
            .get('https://us-central1-pcs3443-6c313.cloudfunctions.net/api/averages')
            .then((response) => {
                const index = response.data.length;
                setLoading(false);
                console.log(response.data[index-1].average_array);

                let cat1 = 0;
                let cat2 = 0;
                let cat3 = 0;
                let cat4 = 0;
                let cat5 = 0;
                let cat6 = 0;

                response.data[index-1].average_array.forEach((item) => {
                    if (item.average < 1000) cat1++;
                    else if (item.average < 2000) cat2++;
                    else if (item.average < 3000) cat3++;
                    else if (item.average < 4000) cat4++;
                    else if (item.average < 5000) cat5++;
                    else cat6++;
                })

                setData([
                    {
                        "range": "0-1000",
                        "people": cat1,
                    },
                    {
                        "range": "1000-2000",
                        "people": cat2,
                    },
                    {
                        "range": "2000-3000",
                        "people": cat3,
                    },
                    {
                        "range": "3000-4000",
                        "people": cat4,
                    },
                    {
                        "range": "4000-5000",
                        "people": cat5,
                    },
                    {
                        "range": "5000-inf",
                        "people": cat6,
                    }
                ])
            })
            .catch((err) => {
                if(err.response.status === 403) {
                    props.history.push('/login');
                  }
                console.log(err);
            });
    }, []);


    if (loading === true) {
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {loading && <CircularProgress size={60} className={classes.uiProgess} />}
            </main>
        );
    }
    else {
        return (    
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}> 
                        <Typography variant="h5">
                            Estatísticas
                        </Typography>               
                    </Grid>
                    <Grid item sm={12}>
                        <Paper className={fixedHeightPaper} elevation={3}>
                        <Typography variant="h6">
                            Média de Passos por Dia
                        </Typography>
                        <br />
                        <ResponsiveContainer width={"90%"}>
                            <BarChart data={data}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="people" fill="#8884d8" name="pessoas" barWidth="20vw"/>
                            </BarChart>
                        </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid >
            </div> 
        );
    }
}