import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { authMiddleWare } from '../util/auth';
import { fade } from '@material-ui/core/styles/colorManipulator';

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
        maxWidth:  '80%',
        marginLeft: 10,
		backgroundColor: fade("#ffffff",0.8)
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
		height: '20px',
		width: '20px',
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
    const [patients, setPatients] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filterType, setFilterType] = React.useState("Nome");
    const [filterKey, setFilterKey] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [filteredPatients, setFilteredPatients] = React.useState(patients);

    const classes = styles();
    
    React.useEffect(() => {
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
                    props.history.push('/login');
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
                {loading && <CircularProgress size={60} className={classes.uiProgess} />}
            </main>
        );
    }
    else {
        console.log(filteredPatients);
        return (
            <Box >
                <Box display="flex" justifyContent="flex-start" my={2}>
                    <Box mx={2} minWidth={0.6}>
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
                    </Box>  
                    <Box display="flex" alignItems="center">
                        
                        
                        <Box mx={2}><Typography   className={classes.typographyStyle}>
                            Filtrar por:  
                        </Typography></Box>
                        
                        <Box ><Select
                            open={dropdownOpen}
                            onOpen={handleDropdownOpen}
                            onClose={handleDropdownClose}
                            onChange={handleDropdownChange}
                            value={filterType}
                            className={ classes.typographyStyle}
                            displayEmpty
                            renderValue={() => { return filterType; }}
                        >
                            <MenuItem value="Nome">Nome</MenuItem>
                            <MenuItem value="FitBit">FitBit</MenuItem>
                        </Select></Box>         
                        
                    </Box>
                </Box>
            
            
                <Box id="blocoLista" >
                    <Grid container spacing={1} maxWidth = "xs">
                        {filteredPatients.map((patient) => (
                            <Grid item sm={12} style={{ width: '100%' }} display="flex" justifyContent="center" >
                                <Card className={classes.root} variant="outlined">
                                    <CardActionArea onClick={() => {props.handleSelectPatient(patient.email)}}>
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
                </Box>
            </Box>
            
        );
        
    }
}

export default PatientList;