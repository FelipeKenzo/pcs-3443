import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

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
}));

export default function Statistics(props) {
    const classes = useStyles();
    const [data, setData] = React.useState("");
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // React.useEffect(() => {
    //     setData(JSON.parse(localStorage.getItem("Patients")).find((patient => patient.email === props.patientEmail)));
    // }, []);

    // React.useEffect(() => {
    //     console.log(data);
    // }, [data]);

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
                    <ResponsiveContainer>
                        <AreaChart width={"90%"} height={"90%"} data={data.goal_array}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="steps" stroke="#8884d8" fillOpacity={1} fill="url(#colorSteps)" name="passos"/>
                        </AreaChart>
                    </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid >
        </div> 
    );
}