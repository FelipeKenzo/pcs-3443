import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import axios from 'axios';

const styles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
    },
    fullWidth: {
        width: '100%'    
    },
    typographyStyle: {
        position: 'relative',
        top: '30%'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

function PreQuestionnaire (props) {
    const classes = styles();
    const [acq1, setAcq1] = React.useState("");
    const [acq2, setAcq2] = React.useState("");
    const [acq3, setAcq3] = React.useState("");
    const [acq4, setAcq4] = React.useState("");
    const [acq5, setAcq5] = React.useState("");
    const [acq6, setAcq6] = React.useState("");
    const [acq7, setAcq7] = React.useState("");
    const [bar1, setBar1] = React.useState("");
    const [bar2, setBar2] = React.useState("");
    const [bar3, setBar3] = React.useState("");
    const [bar4, setBar4] = React.useState("");
    const [bar5, setBar5] = React.useState("");
    const [bar6, setBar6] = React.useState("");
    const [bar7, setBar7] = React.useState("");
    const [bar8, setBar8] = React.useState("");
    const [bar9, setBar9] = React.useState("");
    const [bar10, setBar10] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const newPatient = JSON.parse(localStorage.getItem("registerPatient"));

    const handleChange1 = (e) => {
        setAcq1(e.target.value);
    }
    
    const handleChange2 = (e) => {
        setAcq2(e.target.value);
    }

    const handleChange3 = (e) => {
        setAcq3(e.target.value);
    }

    const handleChange4 = (e) => {
        setAcq4(e.target.value);
    }

    const handleChange5 = (e) => {
        setAcq5(e.target.value);
    }

    const handleChange6 = (e) => {
        setAcq6(e.target.value);
    }

    const handleChange7 = (e) => {
        setAcq7(e.target.value);
    }

    const handleClose = () => {
        setOpen(false);
        props.handleBackToRegister();
    }
    
    // Questionário de Barreiras

    const handleBarChange1 = (e) => {
        setBar1(e.target.value);
    };

    const handleBarChange2 = (e) => {
        setBar2(e.target.value);
    };
    
    const handleBarChange3 = (e) => {
        setBar3(e.target.value);
    };

    const handleBarChange4 = (e) => {
        setBar4(e.target.value);
    };

    const handleBarChange5 = (e) => {
        setBar5(e.target.value);
    };

    const handleBarChange6 = (e) => {
        setBar6(e.target.value);
    };

    const handleBarChange7 = (e) => {
        setBar7(e.target.value);
    };

    const handleBarChange8 = (e) => {
        setBar8(e.target.value);
    };

    const handleBarChange9 = (e) => {
        setBar9(e.target.value);
    };

    const handleBarChange10 = (e) => {
        setBar10(e.target.value);
    };


    const handleSubmit = (event) => {
		event.preventDefault();
        setLoading(true);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		const newPatientData = {
            firstname: newPatient.firstname,
            lastname: newPatient.lastname,
            email: newPatient.email,
            phoneNumber: newPatient.phoneNumber,
            height: newPatient.height,
            weight: newPatient.weight,
            password: newPatient.password,
			confirmPassword: newPatient.confirmPassword,
            proid: localStorage.getItem('proId'),
            acq:
            [
                {
                    date: date,
                    answers: [
                        acq1,
                        acq3,
                        acq2,
                        acq4,
                        acq5,
                        acq6,
                        acq7
                    ]
                },
            ],
            bar: [
                bar1,
                bar2,
                bar3,
                bar4,
                bar5,
                bar6,
                bar7,
                bar8,
                bar9,
                bar10
            ]
		};
		axios
			.post('https://us-central1-pcs3443-6c313.cloudfunctions.net/api/signup/patient', newPatientData)
			.then((response) => {
                localStorage.removeItem("registerPatient");
                setLoading(false);
                setOpen(true);
			})
			.catch((error) => {
                console.log(error);
                setLoading(false);
                let editPatient = newPatient;
                editPatient["errors"] = error.response.data;
                localStorage.setItem("registerPatient", JSON.stringify(editPatient));
                props.handleBackToRegister();
			});
	};
    
    return (
        <div>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Button onClick={props.handleBackToRegister} variant="contained" color="secondary">
                    Voltar
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    Questionário de Controle de Asma
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    1) Em média, durante os últimos sete dias, o quão frequentemente você se acordou por causa de sua asma, durante a noite?
                                </Typography>
                                <RadioGroup name="q1" value={acq1} onChange={handleChange1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Nunca"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Nunca"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Poucas Vezes"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Várias Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Muitas Vezes"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="5" control={<Radio />} label="Muitíssimas vezes"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="6" control={<Radio />} label="Incapaz de dormir devido a asma"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    2) Em média, durante os últimos sete dias, o quão ruins foram os seus sintomas da asma, quando você acordou pela manhã?
                                </Typography>
                                <RadioGroup name="q2" value={acq2} onChange={handleChange2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sem Sintomas"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Sintomas muito leves"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Sintomas leves"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Sintomas moderados"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Sintomas um tanto graves"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="5" control={<Radio />} label="Sintomas graves"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="6" control={<Radio />} label="Sintomas muito graves"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    3) De um modo geral, durante os últimos sete dias, o quão limitado você tem estado em suas atividades por causa de sua asma?
                                </Typography>
                                <RadioGroup name="q3" value={acq3} onChange={handleChange3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Nada limitado"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Muito pouco limitado"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Pouco limitado"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Moderadamente limitado"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Muito limitado"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="5" control={<Radio />} label="Extremamente limitado"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="6" control={<Radio />} label="Totalmente limitado"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    4) De um modo geral, durante os últimos sete dias, o quanto de falta de ar você teve por causa de sua asma?
                                </Typography>
                                <RadioGroup name="q4" value={acq4} onChange={handleChange4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Nenhuma"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Muito pouca"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Alguma"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Moderada"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Bastante"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="5" control={<Radio />} label="Muita"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="6" control={<Radio />} label="Muitíssima"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    5) De um modo geral, durante os últimos sete dias, quanto tempo você teve chiado? 
                                </Typography>
                                <RadioGroup name="q5" value={acq5} onChange={handleChange5}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Nunca"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Nunca"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Pouco tempo"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Algum tempo"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Bastante tempo"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="5" control={<Radio />} label="Quase sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="6" control={<Radio />} label="Sempre"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    6) Em média, durante os últimos sete dias, quantos jatos de broncodilatador de resgate (Sabutamol, Fenoterol, etc) você usou por dia?
                                </Typography>
                                <RadioGroup name="q6" value={acq6} onChange={handleChange6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Nenhum"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="1-2 jatos na maior parte dos dias"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="3-4 jatos na maior parte dos dias"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="5-8 jatos na maior parte dos dias"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="9-12 jatos na maior parte dos dias"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="5" control={<Radio />} label="13-16 jatos na maior parte dos dias"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="6" control={<Radio />} label="Mais de 16 jatos por dia"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    7) VEF1 pré broncodilatador ______ VEF1 previsto ______ VEF1 % previsto
                                </Typography>
                                <RadioGroup name="q7" value={acq7} onChange={handleChange7}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="> 95% do previsto"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="95-90% do previsto"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="89-80% do previsto"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="79-70% do previsto"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="69-60% do previstos"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="5" control={<Radio />} label="59-50% do previsto"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="6" control={<Radio />} label="< 50% do previsto"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    Motivos que dificultam realizar a atividade física
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Não tenho interesse
                                </Typography>
                                <RadioGroup name="b1" value={bar1} onChange={handleBarChange1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Falta de tempo
                                </Typography>
                                <RadioGroup name="b2" value={bar2} onChange={handleBarChange2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Sinto que não tenho energia ou disposição
                                </Typography>
                                <RadioGroup name="b3" value={bar3} onChange={handleBarChange3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Tenho medo de sentir falta de ar
                                </Typography>
                                <RadioGroup name="b4" value={bar4} onChange={handleBarChange4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Não tenho companhia ou incentivo de amigos/família
                                </Typography>
                                <RadioGroup name="b5" value={bar5} onChange={handleBarChange5}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Não tenho dinheiro
                                </Typography>
                                <RadioGroup name="b6" value={bar6} onChange={handleBarChange6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Tenho muitas coisas para fazer
                                </Typography>
                                <RadioGroup name="b7" value={bar7} onChange={handleBarChange7}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Não tenho um local sguro disponível
                                </Typography>
                                <RadioGroup name="b8" value={bar8} onChange={handleBarChange8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Por causa do clima (por exemplo; frio, calor, chuva)
                                </Typography>
                                <RadioGroup name="b9" value={bar9} onChange={handleBarChange9}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <Paper elevation={3}>
                                <Typography variant="h6" component="h6">
                                    Não tenho equipamentos para praticar
                                </Typography>
                                <RadioGroup name="b10" value={bar10} onChange={handleBarChange10}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="0" control={<Radio />} label="Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="1" control={<Radio />} label="Quase Sempre"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="2" control={<Radio />} label="Às Vezes"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}><FormControlLabel value="3" control={<Radio />} label="Raramente"/></Grid>
                                                <Grid item xs={12}><FormControlLabel value="4" control={<Radio />} label="Nunca"/></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    label="Continuar para Questionário"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={loading ||
                        !acq1 ||
                        !acq2 ||
                        !acq3 ||
                        !acq4 ||
                        !acq5 ||
                        !acq6 ||
                        !acq7 ||
                        !bar1 ||
                        !bar2 ||
                        !bar3 ||
                        !bar4 ||
                        !bar5 ||
                        !bar6 ||
                        !bar7 ||
                        !bar8 ||
                        !bar9 ||
                        !bar10}
                >
                    Registrar Novo Paciente
                    {loading && <CircularProgress size={30} className={classes.progess} />}
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Paciente cadastrado com sucesso."}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Fechar
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
        </div>
    );
}

export default PreQuestionnaire;