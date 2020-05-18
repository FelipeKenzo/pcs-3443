import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Chart from './patientdetails';
import {authMiddleWare} from '../util/auth';

import axios from 'axios';

const styles = makeStyles((theme) =>({
    title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
	},
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	form: {
		width: '98%',
		marginLeft: 13,
		marginTop: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {
		minWidth: 470
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	dialogeStyle: {
		maxWidth: '50%'
	},
	viewRoot: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
    },
    fullWidth: {
        width: '100%'    
    },
    typographyStyle: {
        position: 'relative',
        top: '30%'
    },
}));

function PatientList (props) {
    const [patients, setPatients] = React.useState([
        {
            "id" : "1",
            "firstname" : "Luca",
            "lastname" : "Beraldo Basilio"
        },
        {
            "id" : "2",
            "firstname" : "Felipe Kenzo",
            "lastname" : "Kusakawa Mashuda"    
        },
        {
            "id" : "3",
            "firstname" : "Bruno Guo",
            "lastname" : "Lou Wei"    
        },
        {
            "id" : "4",
            "firstname" : "Tiago",
            "lastname" : "Rivero Cavinatto"    
        },
        {
            "id" : "5",
            "firstname" : "Felipe",
            "lastname" : "Miyaji Bilha"    
        }
    ]);
    const [loading, setLoading] = React.useState(true);
    const [filterType, setFilterType] = React.useState("Nome");
    const [filterKey, setFilterKey] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [render, setRender] = React.useState(false)
    const [filteredPatients, setFilteredPatients] = React.useState(patients);

    const classes = styles();
    
    React.useEffect(() => {
        authMiddleWare(props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { authorization: `${authToken}` };
        axios
            .get('https://us-central1-pcs3443-6c313.cloudfunctions.net/api/profiles')
            .then((response) => {
                setPatients(response.data.sort((a, b) => a.firstname.localeCompare(b.firstname)).map(function(patient) {
                    patient.name = patient.firstname + " " + patient.lastname;
                    return patient;
                }));
                setLoading(false);
            })
            .catch((err) => {
                if(err.response.status === 403) {
                    props.history.push('/login')
                  }
                console.log(err);
                setPatients([]);
            });
    }, []);
    

    const handleDropdownChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleDropdownOpen = () => {
        setDropdownOpen(true);
    };

    const handleDropdownClose = () => {
        setDropdownOpen(false);
    };

    const handleTextFieldChange = (e) => {
        e.preventDefault();
        setFilterKey(e.target.value.toUpperCase());
        
    };

    useEffect(() => {
        setFilteredPatients(patients);
    },[patients]);

    useEffect(() => {
        if (filterKey != "") {
            setFilteredPatients(patients.filter(function(patient) {
                return patient.name.toUpperCase().includes(filterKey);
            }));
        }
        else {
            setFilteredPatients(patients);
        }
    }, [filterKey]);

    if (loading === true) {
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {loading && <CircularProgress size={150} className={classes.uiProgess} />}
            </main>
        );
    }
    else {
        console.log(filteredPatients);
        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <TextField 
                                id="chave" 
                                label="Filtro" 
                                variant="outlined" 
                                className={classes.fullWidth} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='end'>
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleTextFieldChange}
                            />
                        </Grid>  
                        <Grid item xs={4}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Typography variant="h5" component="h6" noWrap className={classes.typographyStyle}>
                                        Filtrar por:  
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        open={dropdownOpen}
                                        onOpen={handleDropdownOpen}
                                        onClose={handleDropdownClose}
                                        onChange={handleDropdownChange}
                                        value={filterType}
                                        className={classes.fullWidth, classes.typographyStyle}
                                        displayEmpty
                                        renderValue={() => { return filterType; }}
                                    >
                                        <MenuItem value="Nome">Nome</MenuItem>
                                        <MenuItem value="RGHC">RGHC</MenuItem>
                                    </Select>         
                                </Grid>
                            </Grid>
                                            
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1} maxWidth = "xs">
                        {filteredPatients.map((patient) => (
                            <Grid item sm={12} >
                                <Card className={classes.root} variant="outlined">
                                    <CardActionArea onClick={props.handleSelectPatient}>
                                        <CardContent>
                                            <Typography variant="h6" component="h5" noWrap>
                                                {patient.firstname + " " + patient.lastname}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
        
    }
}

export default PatientList;