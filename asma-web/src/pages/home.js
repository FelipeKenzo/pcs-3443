import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TimelineIcon from '@material-ui/icons/Timeline';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CreateIcon from '@material-ui/icons/Create';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

import axios from 'axios';

import { authMiddleWare } from './util/auth';
import PatientList from './components/patientlist';
import RegisterPatient from './components/registerpatient';
import PatientDetails from './components/patientdetails';
import Statistics from './components/statistics';
import PreQuestionnaire from './components/prequestionnaire';


const drawerWidth = 240;
const logo = require("../images/logo_white.png")

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  typographyFlex: {
    flex: 1,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [toRender, setRender] =  React.useState(0);
  const [patientEmail, setPatientEmail] = React.useState("");
  const [renderDetails, setRenderDetails] = React.useState(false);
  const [renderQuestionnaire, setRenderQuestionnaire] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         type: darkMode ? 'dark' : 'light',
  //       },
  //     }),
  //   [darkMode],
  // );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOutHandler = () => {
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('Patients');
    localStorage.removeItem('registerPatient');

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

  const renderPatient = () => {
    setRender(3);
  }
  
  const renderPrequestionnaire = () => {
    setRender(4);
  }
  
  const handleSelectPatient = (patientEmail) =>   {
    setRender(3);
    setRenderDetails(true);
    setPatientEmail(patientEmail);
  }
  
  const handleBackToList = () => {
    setRenderDetails(false);
    setRender(0);
  }

  const handleToQuestionnaire = () => {
    setRender(4);
    setRenderQuestionnaire(true);
  }

  const handleBackToRegister = () => {
    setRender(2);
    setRenderQuestionnaire(false);
  }

  React.useEffect(() => {
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
  }, []);

    let render;
    switch(toRender) {
      case 0:
        render = <PatientList handleSelectPatient={handleSelectPatient} history={props.history} />;
        break;
      case 1:
        render = <Statistics />;
        break;
      case 2:
        render = <RegisterPatient handleToQuestionnaire={handleToQuestionnaire} />;
        break;
      case 3:
        render = <PatientDetails handleBackToList={handleBackToList} patientEmail={patientEmail} />;
        break;
      case 4:
        render = <PreQuestionnaire handleBackToRegister={handleBackToRegister} />
        break;
    }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
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
            {/*<Typography variant="h6" noWrap className={classes.typographyFlex}>
              RespireHC
          </Typography>*/}
            <img src={logo} width="79px" height="50px" style={{ marginRight:'35%' }}/>

            <IconButton
                color="inherit"
                className={clsx(classes.gearButton, loggedIn === false && classes.hide)}
            >
              <SettingsIcon />
            </IconButton>
					<Button 
						variant="contained" 
						color="default"
						onClick={logOutHandler}>
						{loggedIn ? "Logout" : "Login"}
					</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          <ListItem divider button key="acomp" onClick={renderDetails ? renderPatient : renderAcomp}>
            <ListItemIcon><RecentActorsIcon /></ListItemIcon>
            <ListItemText primary="Acompanhamento" />
          </ListItem>
          <ListItem divider button key="estat" onClick={renderEstat}>
          <ListItemIcon><TimelineIcon /></ListItemIcon>
            <ListItemText primary="Estatísticas" />
          </ListItem>
          <ListItem divider button key="regist" onClick={renderQuestionnaire? renderPrequestionnaire : renderReg}>
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary="Registrar Paciente" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{render}</div>
      </main>
      </ThemeProvider>
    </div>
  );
}