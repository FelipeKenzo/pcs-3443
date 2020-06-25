// login.js

// Material UI components
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progess: {
		position: 'absolute'
	}
});

const logo = require("../images/logo.png")
class login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errors: [],
			loading: false
		};
	}

	// componentWillReceiveProps({UI}) {
	// 	if (UI.errors) {
	// 		this.setState({
	// 			errors: UI.errors
	// 		});
	// 	}
	// }

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.post('https://us-central1-pcs3443-6c313.cloudfunctions.net/api/login', userData)
			.then((response) => {
                console.log(response);
				localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
				localStorage.setItem('proId', `${this.state.email}`);
				this.setState({ 
					loading: false,
				});		
				this.props.history.push('/');
			})
			.catch((error) => {	
				console.log(error);			
				this.setState({
					errors: error.response.data,
					loading: false
				});
			});
	};

	// componentDidMount() {
	// 	if (localStorage.getItem != null) {
	// 		const authToken = localStorage.getItem('AuthToken');
	// 		axios.defaults.headers.common = { Authorization: `${authToken}` };
	// 		axios
	// 		.get('/user')
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			this.props.history.push('/')
	// 		})
	// 		.catch((error) => {
	// 			if(error.response.status === 403) {
	// 			this.props.history.push('/login')
	// 			}
	// 			console.log(error);
	// 		});
	// 	}
	// }

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<img src={logo} width="450px" height="285px" alt={"logo"}/>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
							helperText={errors.email}
							error={errors.email ? true : false}
							onChange={this.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Senha"
							type="password"
							id="password"
							autoComplete="current-password"
							helperText={errors.password}
							error={errors.password ? true : false}
							onChange={this.handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
							disabled={loading || !this.state.email || !this.state.password}
						>
							Sign In
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(styles)(login);