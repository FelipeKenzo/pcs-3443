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



export default function PatientInfo(props) {
    const data = props.data;
    const [isEditing, toggleEditing] = React.useState(false);
    const [firstName, setFirstName] = React.useState(data.firstname);
    const [lastName, setLastName] = React.useState(data.lastname);
    const [height, setHeight] = React.useState(data.height);
    const [weight, setWeight] = React.useState(data.weight);
    const [phone, setPhone] = React.useState(data.phoneNumber);
    const [goal, setGoal] = React.useState(data.goal_array[0].goal);

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

    const handleSaveClick = () => {
        // KENZOOOOOOO BRUNOOOOOO
        toggleEditing(false);
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
                    <div><Button mx={0.5} 
                        variant="contained"
                        color="secondary"
                        startIcon={<ClearIcon />}
                        onClick={handleCancelClick}
                    >
                        Cancelar
                    </Button>
                    <Button mx={0.5} 
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveClick}
                    >
                        Salvar
                    </Button></div>
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