import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const motives = [
    "Não tenho interesse",
    "Falta de tempo",
    "Sinto que não tenho energia ou disposição",
    "Tenho medo de sentir falta de ar",
    "Não tenho companhia ou incentivo de amigos/família",
    "Não tenho dinheiro",
    "Tenho muitas coisas a fazer",
    "Não tenho um local seguro disponível",
    "Por causa do clima",
    "Não tenho equipamentos para praticar"
]

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(motive, answers){
    return { motive, answers };
}

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    root: {
        flexShrink: 0,
        alignItem: 'left',
        marginLeft: theme.spacing(-1),
    }
}));

export default function Barriers(props) {
    const classes = useStyles();

    var rows = [];
    if (props.data !== undefined) {
        const data = props.data;  
        for (var i = 0; i < data.length; i++) {
            let answer = data[i];
            let checklist = [false, false, false, false, false];
            checklist[answer] = true;
            rows.push(createData(motives[i], checklist));
        }
    }


    return (
        <TableContainer component={Paper}>
            <Table stickyHeader className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Motivos</StyledTableCell>
                        <StyledTableCell align="center">
                            Sempre
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Quase sempre
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Às Vezes
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Raramente
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Nunca
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.motive}>
                            <StyledTableCell component="th" scope="row">{row.motive}</StyledTableCell>
                            <StyledTableCell align="center">{row.answers[0] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.answers[1] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.answers[2] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.answers[3] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.answers[4] ? <ClearIcon /> : ""}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
