import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
    camposenha:{
        width: '50%',
    },
});

function ProAccount(props){
    const classes = styles();
    return (
        <div style={{width:'100%', height:'95vh'}}>
        <Box flex="1" flexDirection="column" width={0.5}>
            <Box >
            <Typography component="h1" variant="h5">
                Minha Conta
            </Typography>
            </Box>

            <Box my={3} >
            <Paper elevation={3} >
                <Box flex="1" flexDirection="column" p={2}>
                    <Box mx={0.5} my={0.5} >
                        <Typography component="h5">
                            Alterar Senha
                        </Typography>
                    </Box>
                    <Box mx={0.5} my={1} width="50%">
                        <TextField
                            className={classes.camposenha}
                            variant="outlined"
                            required
                            fullWidth
                            id="atualsenha"
                            type="string"
                            required
                            label="Senha Atual"
                            name="atualsenha"
                            //onChange={this.handleChange}
                            //value={this.state.fitBitId}
                        />
                    </Box>
                    <Box mx={0.5} my={1} width="50%">
                        <TextField
                            className={classes.camposenha}
                            variant="outlined"
                            required
                            fullWidth
                            id="novasenha"
                            type="string"
                            required
                            label="Nova Senha"
                            name="novasenha"
                            //onChange={this.handleChange}
                            //value={this.state.fitBitId}
                        />
                    </Box>
                </Box>
                <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Trocar Senha
                    </Button>
                </Box>
            </Paper>
            </Box>
        </Box>
        </div>
    );
}
export default ProAccount;