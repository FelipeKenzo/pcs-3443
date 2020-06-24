import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
    
const styles = makeStyles((theme) => ({
    progess: {
        position: 'absolute'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

export default function PatientInfo(props) {
    const data = props.data;
    const classes = styles();
    const [isEditing, toggleEditing] = React.useState(false);
    const [firstName, setFirstName] = React.useState(data.firstname);
    const [lastName, setLastName] = React.useState(data.lastname);
    const [height, setHeight] = React.useState(data.height);
    const [weight, setWeight] = React.useState(data.weight);
    const [phone, setPhone] = React.useState(data.phoneNumber);
    const [goal, setGoal] = React.useState(data.goal_array[0].goal);
    const [isLoading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const handleEditClick = () => {
        toggleEditing(true);
    };

    const handleCancelClick = () => {
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setHeight(data.height);
        setWeight(data.weight);
        setPhone(data.phoneNumber);
        setGoal(data.goal_array[0].goal);
        toggleEditing(false);
    }

    const handleClose = () => {
        setOpen(false);
        toggleEditing(false);
    }

    const handleSaveClick = (event) => {
        const authToken = localStorage.getItem('AuthToken');
        event.preventDefault();
        setLoading(true);
        const updateData = {
            id: data.email,
            firstname: firstName,
            lastname: lastName,
            phoneNumber: phone,
            height: height,
            weight: weight
        }
        axios.defaults.headers.common = { authorization: `${authToken}` };
        axios
            .put('https://us-central1-pcs3443-6c313.cloudfunctions.net/api/profiles', updateData)
            .then((response) => {
                setLoading(false);
                setOpen(true);
            })
            .catch((err) => {
                if(err.response.status === 403) {
                    props.history.push('/login');
                  }
                console.log(err);
            });
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    }

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleGoalChange = (e) => {
        setGoal(e.target.value);
    }

    return (
        <Box height="100%" width="100%">
                <Box height="90%" display="block">
                {isEditing
                    ? <Grid container spacing={2}>
                    <Grid item xs={12}><TextField
                        variant="outlined"
                        value={firstName}
                        label="Nome"
                        onChange={handleFirstNameChange}
                        fullWidth
                        required
                    /></Grid>
                    <Grid item xs={12}><TextField
                        variant="outlined"
                        value={lastName}
                        label="Sobrenome"
                        onChange={handleLastNameChange}
                        fullWidth
                        required
                    /></Grid>
                    <Grid item xs={12}><TextField
                        variant="outlined"
                        value={weight}
                        label="Peso (kg)"
                        onChange={handleWeightChange}
                        fullWidth
                        required
                    /></Grid>
                    <Grid item xs={12}><TextField 
                        variant="outlined"
                        value={height}
                        label="Altura (cm)"
                        onChange={handleHeightChange}
                        fullWidth
                        required
                    /></Grid>
                    <Grid item xs={12}><TextField 
                        variant="outlined"
                        value={phone}
                        label="Telefone"
                        onChange={handlePhoneChange}
                        fullWidth
                        required
                    /></Grid>
                    <Grid item xs={12}><TextField 
                        variant="outlined"
                        value={goal}
                        label="Meta (passos)"
                        onChange={handleGoalChange}
                        fullWidth
                        required
                    /></Grid>
                    </Grid>
                    : <div>
                    <Typography variant="h5">{firstName + " " + lastName}</Typography>
                    <br />
                    <Typography component="div">
                        <Box fontWeight="fontWeightBold" m={1} display="inline">Peso:</Box>
                        <Box fontWeight="fontWeightRegular" m={1} display="inline">
                        {isEditing 
                            ? <TextField
                                variant="outlined"
                                name="Peso"
                                value={weight}
                                onChange={handleWeightChange}
                                required
                            />
                            : weight + " kg"
                        }
                        </Box>
                        <br />
                        <Box fontWeight="fontWeightBold" m={1} display="inline">Altura:</Box>
                        <Box fontWeight="fontWeightRegular" m={1} display="inline">{height + " cm"}</Box>
                        <br />
                        <Box fontWeight="fontWeightBold" m={1} display="inline">Telefone:</Box>
                        <Box fontWeight="fontWeightRegular" m={1} display="inline">{phone}</Box>
                        <br />
                        <br />
                        <Box fontWeight="fontWeightBold" m={1} display="inline">Meta:</Box>
                        <Box fontWeight="fontWeightRegular" m={1} display="inline">{goal + " passos"}</Box>
                    </Typography>
                    </div>
                }
                </Box>

            {
            //=========================
            // Botoes 
            //=========================
            }
            
            <Box display="flex" height="10%" justifyContent="flex-end">
                {isEditing ? 
                    <div style={{width:'100%'}}>
                    <Box display="flex" justifyContent="flex-end">
                        <Box mx={0.5}>
                            <Button mx={0.5} 
                                variant="contained"
                                color="secondary"
                                startIcon={<ClearIcon />}
                                onClick={handleCancelClick}
                            >
                                Cancelar
                            </Button>
                        </Box>

                        <Box mx={0.5}>
                            <Button mx={0.5} 
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={handleSaveClick}
                            >
                                Salvar
                                {isLoading && <CircularProgress size={30} className={classes.progess} />}
                            </Button>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">{"Paciente editado com sucesso."}</DialogTitle>
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
                        </Box>
                    </Box>
                    </div>

                    :<Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}    
                    onClick={handleEditClick}
                    >
                        Alterar
                    </Button>
                }
            </Box>
        </Box>
    );
}