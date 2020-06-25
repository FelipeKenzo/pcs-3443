import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';
import { fade } from '@material-ui/core/styles/colorManipulator';

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
	},
	textfields:{
		backgroundColor: fade("#ffffff",0.8)
	}
});

class RegisterPatient extends Component {

	constructor(props) {
		super(props);
		
		if (localStorage.getItem("registerPatient") != null) {
			this.state = JSON.parse(localStorage.getItem("registerPatient"));
			console.log(localStorage.getItem("registerPatient"));
		}
		else {
			this.state = {
				firstname: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				height: '',
				weight: '',
				fitBitNum: '',
				password: '',
				confirmPassword: '',
				errors: [],
				loading: false,
				open: false
			};
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
			errors: []
		}, () => {
			localStorage.setItem("registerPatient", JSON.stringify(this.state));
		});
	};

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
									className={classes.textfields}
									required
									fullWidth
									id="firstname"
									label="Nome"
									name="firstname"
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
									className={classes.textfields}
									required
									id="lastname"
									label="Sobrenome"
									name="lastname"
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
									className={classes.textfields}
									required
									fullWidth
									id="height"
									label="Altura"
									type="number"
									name="height"
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
									className={classes.textfields}
									required
									label="Peso"
									type="number"
									name="weight"
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
									className={classes.textfields}
									required
									fullWidth
									id="newEmail"
									label="Email"
									name="email"
									autoComplete="off"
									helperText={errors.email}
									value={this.state.email}
									error={errors.email ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phoneNumber"
									className={classes.textfields}
									required
									type="tel"
									label="Telefone"
									name="phoneNumber"
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
									id="fitBitId"
									type="number"
									className={classes.textfields}
									required
									label="Número do Fit Bit"
									name="fitBitId"
									helperText={errors.fitBitId}
									error={errors.fitBitId ? true : false}
									onChange={this.handleChange}
									value={this.state.fitBitId}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									variant="outlined"
									required
									className={classes.textfields}
									required
									fullWidth
									name="password"
									label="Senha"
									type="password"
									id="newPassword"
									autoComplete="new-password"
									error={errors.confirmPassword ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									className={classes.textfields}
									required
									name="confirmPassword"
									label="Confirmar Senha"
									type="password"
									id="confirmPassword"
									helperText={errors.confirmPassword}
									error={errors.confirmPassword ? true : false}
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
							label="Continuar para Questionário"
							className={classes.submit}
							onClick={this.props.handleToQuestionnaire}
							disabled={loading || 
								!this.state.firstname ||
								!this.state.lastname ||
								!this.state.height ||
								!this.state.weight ||
								!this.state.email || 
								!this.state.password ||
								!this.state.confirmPassword}
						>
							Continuar para Questionário
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						
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