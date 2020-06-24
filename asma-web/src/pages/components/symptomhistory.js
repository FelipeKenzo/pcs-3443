import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
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

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(date, symptoms){
    return { date, symptoms };
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

function TablePaginationActions(props) {
    const classes = useStyles();
    const { count, page, rowsPerPage, onChangePage } = props;
    
    const handleFirstPageButtonClick = (e) => {
        onChangePage(e, 0);
    };

    const handleBackButtonClick = (e) => {
        onChangePage(e, page - 1);
    };

    const handleNextButtonClick = (e) => {
        onChangePage(e, page + 1);
    };

    const handleLastPageButtonClick = (e) => {
        onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <LastPageIcon />
            </IconButton>
        </div>
    )
}

export default function SymptomHistory(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    var rows = [];
    if (props.data !== undefined) {
        const data = props.data;  
        var rows = [];
        for (var i = 0; i < data.length; i++) {
            let symptoms = data[i].sintomas;
            let checklist = [false, false, false, false, false];
            for (var j = 0; j < symptoms.length; j++) {
                checklist[0] = (symptoms[j] == "Tosse");
                checklist[1] = (symptoms[j] == "Chiado");
                checklist[2] = (symptoms[j] == "Falta de ar");
                checklist[3] = (symptoms[j] == "Acordar");
                checklist[4] = (symptoms[j] == "Bombinha");
            }
            rows.push(createData(data[i].date, checklist));
        }
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Data</StyledTableCell>
                        <StyledTableCell align="center">Tosse</StyledTableCell>
                        <StyledTableCell align="center">Chiado</StyledTableCell>
                        <StyledTableCell align="center">Falta de ar</StyledTableCell>
                        <StyledTableCell align="center">Acordar</StyledTableCell>
                        <StyledTableCell align="center">Bombinha</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                        : rows
                    ).map((row) => (
                        <StyledTableRow key={row.date}>
                            <StyledTableCell component="th" scope="row">{row.date}</StyledTableCell>
                            <StyledTableCell align="center">{row.symptoms[0] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.symptoms[1] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.symptoms[2] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.symptoms[3] ? <ClearIcon /> : ""}</StyledTableCell>
                            <StyledTableCell align="center">{row.symptoms[4] ? <ClearIcon /> : ""}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[1, 10, 20, 30, { label: 'Todas', value: -1 }]}
                            colSpan={6}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

