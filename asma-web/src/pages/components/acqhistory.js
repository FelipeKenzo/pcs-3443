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
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }))(Tooltip);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(date, labels){
    return { date, labels };
}

const answerLabels = [
    [
        "Nunca",
        "Quase Nunca",
        "Poucas Vezes",
        "Várias Vezes",
        "Muitas Vezes",
        "Muitíssimas vezes",
        "Incapaz de dormir devido a asma"
    ],
    [
        "Sem Sintomas",
        "Sintomas muito leves",
        "Sintomas leves",
        "Sintomas moderados",
        "Sintomas um tanto graves",
        "Sintomas graves",
        "Sintomas muito graves"
    ],
    [
        "Nada limitado",
        "Muito pouco limitado",
        "Pouco limitado",
        "Moderadamente limitado",
        "Muito limitado",
        "Extremamente limitado",
        "Totalmente limitado"
    ],
    [
        "Nenhuma",
        "Muito pouca",
        "Alguma",
        "Moderada",
        "Bastante",
        "Muita",
        "Muitíssima"
    ],
    [
        "Nunca",
        "Quase Nunca",
        "Pouco tempo",
        "Algum tempo",
        "Bastante tempo",
        "Quase sempre",
        "Sempre"
    ],
    [
        "Nenhum",
        "1-2 jatos na maior parte dos dias",
        "3-4 jatos na maior parte dos dias",
        "5-8 jatos na maior parte dos dias",
        "9-12 jatos na maior parte dos dias",
        "13-16 jatos na maior parte dos dias",
        "Mais de 16 jatos por dia"
    ],
    [
        "> 95% do previsto",
        "95-90% do previsto",
        "89-80% do previsto",
        "79-70% do previsto",
        "69-60% do previstos",
        "59-50% do previsto",
        "< 50% do previsto"
    ]
]

const questions = [
    "Em média, durante os últimos sete dias, o quão frequentemente você se acordou por causa de sua asma, durante a noite?",
    "Em média, durante os últimos sete dias, o quão ruins foram os seus sintomas da asma, quando você acordou pela manhã?",
    "De um modo geral, durante os últimos sete dias, o quão limitado você tem estado em suas atividades por causa de sua asma?",
    "De um modo geral, durante os últimos sete dias, o quanto de falta de ar você teve por causa de sua asma?",
    "De um modo geral, durante os últimos sete dias, quanto tempo você teve chiado?",
    "Em média, durante os últimos sete dias, quantos jatos de broncodilatador de resgate (Sabutamol, Fenoterol, etc) você usou por dia?",
    "VEF1 pré broncodilatador ______ VEF1 previsto ______ VEF1 % previsto"
]

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    root: {
        flexShrink: 0,
        alignItem: 'left',
        marginLeft: theme.spacing(-1),
    },
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
        for (var i = 0; i < data.length; i++) {
            let answers = data[i].answers;
            console.log(answers)
            let labels = ["", "", "", "", "", "", ""];
            for (var j = 0; j < labels.length; j++) {
                console.log(answerLabels[j][answers[j]]);
                labels[j] = answerLabels[j][answers[j]];
            }
            rows.push(createData(data[i].date, labels));
        }
    }

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
                        <StyledTableCell >Data</StyledTableCell>
                        <LightTooltip title={questions[0]} placement="top">
                            <StyledTableCell align="center">Questão 1</StyledTableCell>
                        </LightTooltip>
                        <LightTooltip title={questions[1]} placement="top">
                            <StyledTableCell align="center">Questão 2</StyledTableCell>
                        </LightTooltip>
                        <LightTooltip title={questions[2]} placement="top">
                            <StyledTableCell align="center">Questão 3</StyledTableCell>
                        </LightTooltip>
                        <LightTooltip title={questions[3]} placement="top">
                            <StyledTableCell align="center">Questão 4</StyledTableCell>
                        </LightTooltip>
                        <LightTooltip title={questions[4]} placement="top">
                            <StyledTableCell align="center">Questão 5</StyledTableCell>
                        </LightTooltip>
                        <LightTooltip title={questions[5]} placement="top">
                            <StyledTableCell align="center">Questão 6</StyledTableCell>
                        </LightTooltip>
                        <LightTooltip title={questions[6]} placement="top">
                            <StyledTableCell align="center">Questão 7</StyledTableCell>
                        </LightTooltip>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                        : rows
                    ).map((row) => (
                        <StyledTableRow key={row.date}>
                            <StyledTableCell component="th" scope="row">{row.date}</StyledTableCell>
                            <LightTooltip title={questions[0]} placement="top">
                                <StyledTableCell align="center">{row.labels[0]}</StyledTableCell>
                            </LightTooltip>
                            <LightTooltip title={questions[1]} placement="top">
                                <StyledTableCell align="center">{row.labels[1]}</StyledTableCell>
                            </LightTooltip>
                            <LightTooltip title={questions[2]} placement="top">
                                <StyledTableCell align="center">{row.labels[2]}</StyledTableCell>
                            </LightTooltip>
                            <LightTooltip title={questions[3]} placement="top">
                                <StyledTableCell align="center">{row.labels[3]}</StyledTableCell>
                            </LightTooltip>
                            <LightTooltip title={questions[4]} placement="top">
                                <StyledTableCell align="center">{row.labels[4]}</StyledTableCell>
                            </LightTooltip>
                            <LightTooltip title={questions[5]} placement="top">
                                <StyledTableCell align="center">{row.labels[5]}</StyledTableCell>
                            </LightTooltip>
                            <LightTooltip title={questions[6]} placement="top">
                                <StyledTableCell align="center">{row.labels[6]}</StyledTableCell>
                            </LightTooltip>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter display="flex" justifyContent="flex-end">
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[1, 10, 20, 30, { label: 'Todas', value: -1 }]}
                            colSpan={8}
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

