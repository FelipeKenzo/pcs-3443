import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


function ExportCSV(csvData, fileName) {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        console.log(csvData);
        console.log(typeof csvData);
        const ws = XLSX.utils.json_to_sheet([csvData]);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="contained" color="primary" onClick={(e) => exportToCSV(csvData,fileName)} endIcon=<GetAppIcon />>Exportar</Button>
    );
}

export default function SpreadsheetGenerator (props) {
    const data = props.data;
    const name = "testando";

    return (
        <div>{ExportCSV(data, name)}</div>
    );
}