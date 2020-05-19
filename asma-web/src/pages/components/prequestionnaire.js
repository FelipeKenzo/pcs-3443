import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
		alignItems: 'center'
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
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

function PreQuestionnaire (props) {
    const classes = styles();
    const [answers, setAnswers] = React.useState([0,0,0,0,0,0,0]);
    const [answer1, setAnswer1] = React.useState("");
    const [answer2, setAnswer2] = React.useState("");
    const [answer3, setAnswer3] = React.useState("");
    const [answer4, setAnswer4] = React.useState("");
    const [answer5, setAnswer5] = React.useState("");
    const [answer6, setAnswer6] = React.useState("");
    const [answer7, setAnswer7] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const newPatient = JSON.parse(localStorage.getItem("registerPatient"));

    const handleChange1 = (e) => {
        setAnswer1(e.target.value);
    }
    
    const handleChange2 = (e) => {
        setAnswer2(e.target.value);
    }

    const handleChange3 = (e) => {
        setAnswer3(e.target.value);
    }

    const handleChange4 = (e) => {
        setAnswer4(e.target.value);
    }

    const handleChange5 = (e) => {
        setAnswer5(e.target.value);
    }

    const handleChange6 = (e) => {
        setAnswer6(e.target.value);
    }

    const handleChange7 = (e) => {
        setAnswer7(e.target.value);
    }

    const handleClose = () => {
        setOpen(false);
        props.handleBackToRegister();
	}

    const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		const newPatientData = {
            firstname: newPatient.firstname,
            lastname: newPatient.lastname,
            email: newPatient.email,
            phoneNumber: newPatient.phoneNumber,
            height: newPatient.height,
            weight: newPatient.weight,
            password: newPatient.password,
			confirmPassword: newPatient.confirmPassword,
			proid: localStorage.getItem('proId')
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
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Button onClick={props.handleBackToRegister} variant="contained" color="secondary">
                    Voltar
                </Button>
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
                                <RadioGroup name="q1" value={answer1} onChange={handleChange1}>
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
                                <RadioGroup name="q2" value={answer2} onChange={handleChange2}>
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
                                <RadioGroup name="q3" value={answer3} onChange={handleChange3}>
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
                                <RadioGroup name="q4" value={answer4} onChange={handleChange4}>
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
                                <RadioGroup name="q5" value={answer5} onChange={handleChange5}>
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
                                <RadioGroup name="q6" value={answer6} onChange={handleChange6}>
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
                                <RadioGroup name="q7" value={answer7} onChange={handleChange7}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    label="Continuar para Questionário"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={loading}
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
    );
}

export default PreQuestionnaire;