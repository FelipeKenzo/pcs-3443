import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

import { authMiddleWare } from './util/auth';
import PatientList from './components/patientlist';
import RegisterPatient from './components/registerpatient';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
	},
	typographyFlex: {
		flex: 1,
	},
	gearButton: {
		marginRight: theme.spacing(2),
	}
}));

export default function Home(props) {
	
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [toRender, setRender] =  React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOutHandler = () => {
    localStorage.removeItem('AuthToken');
    props.history.push('/login');
  }

  const renderAcomp = () => {
    setRender(0);
  }

  const renderEstat = () => {
    setRender(1);
  }

  const renderReg = () => {
    setRender(2);
  }

  authMiddleWare(props.history);
  const authToken = localStorage.getItem('AuthToken');
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  axios
    .get('/user')
    .then((response) => {
      console.log(response.data);
      setLoggedIn(true);
    })
    .catch((error) => {
      if(error.response.status === 403) {
        props.history.push('/login')
      }
      console.log(error);
    });

    let render;
    switch(toRender) {
      case 0:
        render = <PatientList />;
        break;
      case 1:
        render = <h1>Stats</h1>;
        break;
      case 2:
        render = <RegisterPatient />;
        break;
    }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {loggedIn && 
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
					}
          <Typography variant="h6" noWrap className={classes.typographyFlex}>
            {loggedIn ? "Olá!" : "Login necessário."}
          </Typography>
					<IconButton
							color="inherit"
							className={clsx(classes.gearButton, loggedIn === false && classes.hide)}
					>
						<SettingsIcon />
					</IconButton>
					<Button 
						variant="contained" 
						color="secondary"
						onClick={logOutHandler}>
						{loggedIn ? "Logout" : "Login"}
					</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem divider button key="acomp" onClick={renderAcomp}>
            <ListItemText primary="Acompanhamento" />
          </ListItem>
          <ListItem divider button key="estat" onClick={renderEstat}>
            <ListItemText primary="Estatísticas" />
          </ListItem>
          <ListItem divider button key="regist" onClick={renderReg}>
            <ListItemText primary="Registrar Paciente" />
          </ListItem>
        </List>
      </Drawer>
      <div>{render}</div>
    </div>
  );
}
