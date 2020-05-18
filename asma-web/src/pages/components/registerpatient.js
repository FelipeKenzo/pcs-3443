import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import axios from 'axios';

const styles = (theme) => ({
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

class RegisterPatient extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstname: '',
			lastName: '',
            email: '',
            phoneNumber: '',
            height: '',
            weight: '',
			password: '',
			confirmPassword: '',
			errors: [],
			loading: false,
			open: false
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const newPatientData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            height: this.state.height,
            weight: this.state.weight,
            password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			proid: localStorage.getItem('proId')
		};
		axios
			.post('https://us-central1-pcs3443-6c313.cloudfunctions.net/api/signup/patient', newPatientData)
			.then((response) => {
				this.setState({ 
					firstname: '',
					lastname: '',
					email: '',
					phoneNumber: '',
					height: '',
					weight: '',
					password: '',
					confirmPassword: '',
					loading: false,
					open: true
				});
			})
			.catch((error) => {
                console.log(error);
				this.setState({
					errors: error.response.data,
					loading: false
				});
			});
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	}

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<div>
				<Typography component="h1" variant="h5">
					Registrar Novo Paciente
				</Typography>
				<div className={classes.paper}>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="firstname"
									label="Nome"
									name="firstname"
									autoComplete="firstname"
									helperText={errors.firstName}
									error={errors.firstName ? true : false}
									onChange={this.handleChange}
									value={this.state.firstname}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastname"
									label="Sobrenome"
									name="lastname"
									autoComplete="lastname"
									helperText={errors.lastname}
									error={errors.lastname ? true : false}
									onChange={this.handleChange}
									value={this.state.lastname}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="height"
									label="Altura"
									type="number"
									name="height"
									autoComplete="altura"
									helperText={errors.height}
									error={errors.height ? true : false}
									onChange={this.handleChange}
									value={this.state.height}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="weight"
									label="Peso"
									type="number"
									name="weight"
									autoComplete="peso"
									helperText={errors.weight}
									error={errors.weight ? true : false}
									onChange={this.handleChange}
									value={this.state.weight}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="newemail"
									label="Email"
									name="email"
									autoComplete="email"
									helperText={errors.email}
									error={errors.email ? true : false}
									onChange={this.handleChange}
									value={this.state.email}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phoneNumber"
									type="tel"
									label="Telefone"
									name="phoneNumber"
									autoComplete="phoneNumber"
									helperText={errors.telephone}
									error={errors.telephone ? true : false}
									onChange={this.handleChange}
									value={this.state.phoneNumber}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Senha"
									type="password"
									id="newpassword"
									autoComplete="current-password"
									helperText={errors.password}
									error={errors.password ? true : false}
									onChange={this.handleChange}
									value={this.state.password}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirmPassword"
									label="Confirmar Senha"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
									onChange={this.handleChange}
									value={this.state.confirmPassword}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							label="Registrar"
							className={classes.submit}
							onClick={this.handleSubmit}
							disabled={loading || 
								!this.state.firstname ||
								!this.state.lastname ||
								!this.state.height ||
								!this.state.weight ||
								!this.state.email || 
								!this.state.password ||
								!this.state.confirmPassword}
						>
							Cadastrar
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Dialog
							open={this.state.open}
							TransitionComponent={Transition}
							keepMounted
							onClose={this.handleClose}
							aria-labelledby="alert-dialog-slide-title"
							aria-describedby="alert-dialog-slide-description"
						>
							<DialogTitle id="alert-dialog-slide-title">{"Paciente cadastrado com sucesso."}</DialogTitle>
							<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
							</DialogContentText>
							</DialogContent>
							<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Fechar
							</Button>
							</DialogActions>
						</Dialog>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
					</form>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(RegisterPatient);