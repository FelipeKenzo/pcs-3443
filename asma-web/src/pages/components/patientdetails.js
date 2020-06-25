import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

import axios from 'axios';

import SymptomHistory from './symptomhistory';
import AcqHistory from './acqhistory';
import PatientInfo from './patientinfo';
import SpreadsheetGenerator from './spreadsheetgen';
import Barriers from './barriers';

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
    fixedHalfHeight: {
        height: "75vh",
    },
    bottomButton: {
        position: 'relative',
        bottom: '0',
    },
    uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '20px',
		width: '20px',
		left: '50%',
		top: '35%'
    },
    height90: {
        height: '90%'
    },
    height10: {
        height: '10%',
    },
    exportButton: {
    },
}));

export default function PatientDetails(props) {
    const classes = useStyles();
    const [data, setData] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [stepSeries, setStepSeries] = React.useState([]);
    const [maxY, setMaxY] = React.useState(0);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHalfHeightPaper = clsx(classes.paper, classes.fixedHalfHeight);

    React.useEffect(() => {
        const authToken = localStorage.getItem('AuthToken');
        const patient = {
            id: props.patientEmail
        };
        axios.defaults.headers.common = { authorization: `${authToken}` };
        axios
            .post('https://us-central1-pcs3443-6c313.cloudfunctions.net/api/profile/p', patient)
            .then((response) => {
                console.log(response.data);
                setData(response.data[0]);
                const steps = response.data[0].history_array.map((item,i) => {
                    item["goal"] = response.data[0].goal_array[i].goal;
                    return item;
                });
                setStepSeries(steps.reverse());
                var max = 0;
                steps.forEach((item) => {
                    if (max < parseInt(item.steps)) max = item.steps;
                    if (max < parseInt(item.goal)) max = item.goal;
                });
                console.log(max);
                setMaxY(max);
                setLoading(false);
            })
            .catch((err) => {
                if(err.response !== undefined && err.response.status === 403) {
                    props.history.push('/login');
                  }
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        console.log(data);
    }, [data]);

    
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
                    <Grid item xs={12} className={classes}>
                        <Grid container spacing={5} >
                            <Grid item xs={1} justify="flex-start">
                                <Button 
                                    variant="contained"
                                    color="secondary" 
                                    onClick={props.handleBackToList}
                                    startIcon={<ArrowLeftIcon />}
                                >
                                    Voltar
                                </Button>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h4" align="center">
                                    Acompanhamento
                                </Typography>
                            </Grid>
                            <Grid item xs={2} display="flex" justify="flex-end">
                                <SpreadsheetGenerator data={data} />
                            </Grid>
                        </Grid>        
                    </Grid>
                    <Grid item sm={12} md={3}>
                            <Grid item xs={12}>
                                <Paper className={fixedHeightPaper} elevation={3}>
                                    <PatientInfo data={data} />
                                </Paper>
                            </Grid>
                    </Grid>
                    <Grid item sm={12} md={9}>
                        <Paper className={fixedHeightPaper} elevation={3}>
                        <ResponsiveContainer>
                            <AreaChart width={730} height={250} data={stepSeries}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000080" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#000080" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, parseInt(maxY)]}/>
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="steps" stroke="#000080" fillOpacity={1} fill="url(#colorSteps)" name="passos"/>
                                <Area type="monotone" dataKey="goal"  stroke="#FF0000" fillOpacity={1} fill="url(#colorGoals)" name="meta"/>
                            </AreaChart>
                        </ResponsiveContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Diário de Sintomas
                        </Typography>
                        <SymptomHistory data={data.sintomas}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Questionário de Acompanhamento de Sintomas
                        </Typography>
                        <AcqHistory data={data.acq}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Barreiras ao Exercício
                        </Typography>
                        <Barriers data={data.bar} />
                    </Grid>
                </Grid>
            </div> 
        );
    }
}