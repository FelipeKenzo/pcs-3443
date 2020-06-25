import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


function ExportCSV(csvData) {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const filename = csvData.firstname + " " + csvData.lastname;

    const exportToCSV = (csvData, filename) => {

        var steps_se = [7, 7];
        var sympt_se = [7, 7];
        var acq_se = [7, 7];
        var bar_se = [7, 7];
        var data = [];

        data.push(['Nome: ', csvData.firstname + " " + csvData.lastname]);
        data.push(['Altura: ', csvData.height + " cm"]);
        data.push(['Peso: ', csvData.weight + " kg"]);
        data.push(['Telefone: ', csvData.phoneNumber]);
        data.push(['E-mail: ', csvData.email]);
        data.push([]);
        data.push([]);
 
        if (csvData.history_array !== undefined && csvData.history_array.length > 0) {
            data.push(['Histórico de passos']);
            data.push(['Data', 'Passos', 'Meta']);
            steps_se[1] += (csvData.history_array.length + 2);
            sympt_se[0] = steps_se[1] + 2;
            sympt_se[1] = steps_se[1] + 2;
            acq_se[0] = steps_se[1] + 2;
            acq_se[1] = steps_se[1] + 2;
            bar_se[0] = steps_se[1] + 2;
            bar_se[1] = steps_se[1] + 2;
            for (var i = 0; i < csvData.history_array.length; i++) {
                data.push([csvData.history_array[i].date, csvData.history_array[i].steps, csvData.history_array[i].goal]);
                
            }
            data.push([]);
            data.push([]);
        }

        if (csvData.sintomas !== undefined && csvData.sintomas.length > 0) {
            data.push(['Diário de Sintomas']);
            data.push(['Data', 'Tosse', 'Chiado', 'Falta de ar', 'Acordar', 'Bombinha']);
            sympt_se[1] += (csvData.sintomas.length + 2);
            acq_se[0] = sympt_se[1] + 2;
            acq_se[1] = sympt_se[1] + 2;
            bar_se[0] = sympt_se[1] + 2;
            bar_se[1] = sympt_se[1] + 2;

            for (var i = 0; i < csvData.sintomas.length; i++) {
                var checklist = [false, false, false, false, false]
                for (var j = 0; j < csvData.sintomas[i].sintomas.length; j++) {
                    if (csvData.sintomas[i].sintomas[j] === "Tosse") checklist[0] = true;
                    if (csvData.sintomas[i].sintomas[j] === "Chiado") checklist[1] = true;
                    if (csvData.sintomas[i].sintomas[j] === "Falta de ar") checklist[2] = true;
                    if (csvData.sintomas[i].sintomas[j] === "Acordar") checklist[3] = true;
                    if (csvData.sintomas[i].sintomas[j] === "Bombinha") checklist[4] = true; 
                }
                data.push([csvData.sintomas[i].date, checklist[0], checklist[1], checklist[2], checklist[3], checklist[4]])
            }
            data.push([]);
            data.push([]);
        }

        if (csvData.acq !== undefined && csvData.acq.length > 0) {
            data.push(['Questionário de Acompanhamento de Sintomas']);
            data.push(['Data', 'Questão 1', 'Questão 2', 'Questão 3', 'Questão 4', 'Questão 5', 'Questão 6', 'Questão 7']); 
            acq_se[1] += (csvData.acq.length + 2);
            bar_se[0] = acq_se[1] + 2;
            bar_se[1] = acq_se[1] + 2; 

            var possible1 = ['Nunca', 'Quase nunca', 'Poucas Vezes', 'Várias vezes', 'Muitas vezes', 'Muitíssimas vezes', 'Incapaz de dormir devido a asma'];
            var possible2 = ['Sem sintomas', 'Sintomas muito leves', 'Sintomas leves', 'Sintomas moderados', 'Sintomas um tanto graves', 'Sintomas graves', 'Sintomas muito graves'];
            var possible3 = ['Nada limitado', 'Muito pouco limitado', 'Pouco limitado', 'Moderadamente limitado', 'Muito limitado', 'Extremamente limitado', 'Totalmente limitado'];
            var possible4 = ['Nenhuma', 'Muito pouca', 'Alguma', 'Moderada', 'Bastante', 'Muita', 'Muitíssima'];
            var possible5 = ['Nunca', 'Quase nunca', 'Pouco tempo', 'Algum tempo', 'Bastante tempo', 'Quase sempre', 'Sempre'];
            var possible6 = ['Nenhum', '1-2 jatos na maior parte dos dias', '3-4 jatos na maior parte dos dias', '5-8 jatos na maior parte dos dias', '9-12 jatos na maior parte dos dias', '13-16 jatos na maior parte dos dias', 'Mais de 16 jatos por dia'];
            var possible7 = ['>95% do previsto', '95-90% do previsto', '89-80% do previsto', '79-70% do previsto', '69-60% do previsto', '59-50% do previsto', '<50% do previsto'];
            for (var i = 0; i < csvData.acq.length; i++) {
                var aux = csvData.acq[i].answers;
                data.push([csvData.acq[i].date, possible1[aux[0]], possible2[aux[1]], possible3[aux[2]], possible4[aux[3]], possible5[aux[4]], possible6[aux[5]], possible7[aux[6]]])
            }
            data.push([]);
            data.push([]);
        }

        if (csvData.bar !== undefined && csvData.bar.length > 0) {
            data.push(['Barreiras ao exercício']);
            data.push(['Motivos', 'Sempre', 'Quase sempre', 'Às vezes', 'Raramente', 'Nunca']);
            bar_se[1] = (csvData.bar.length + 2);

            var line1 = ['Não tenho interesse', '', '', '', '', ''];
            var line2 = ['Falta de tempo', '', '', '', '', ''];
            var line3 = ['Sinto que não tenho energia ou disposição', '', '', '', '', ''];
            var line4 = ['Tenho medo de sentir falta de ar', '', '', '', '', ''];
            var line5 = ['Não tenho companhia ou incentivo de amigos/família', '', '', '', '', ''];
            var line6 = ['Não tenho dinheiro', '', '', '', '', ''];
            var line7 = ['Tenho muitas coisas a fazer', '', '', '', '', ''];
            var line8 = ['Não tenho um local seguro disponível', '', '', '', '', ''];
            var line9 = ['Por causa do clima', '', '', '', '', ''];
            var line10 = ['Não tenho equipamentos para praticar', '', '', '', '', ''];
            var lines = [line1, line2, line3, line4, line5, line6, line7, line8, line9, line10];

            let index = csvData.bar[0];
            console.log(typeof index);
            console.log(index);
            for (var i = 0; i < csvData.bar.length; i++) {
                let index = csvData.bar[i];
                index++;
                lines[i][index] = 'X';
                data.push(lines[i]);
            }

            data.push([]);
            data.push([]);
        }
        
        var merges = [
            { s: { c: 1, r: 0 }, e: { c: 5, r: 0 } }, // Nome
            { s: { c: 1, r: 1 }, e: { c: 5, r: 1 } }, // Peso
            { s: { c: 1, r: 2 }, e: { c: 5, r: 2 } }, // Altura
            { s: { c: 1, r: 3 }, e: { c: 5, r: 3 } }, // Tel
            { s: { c: 1, r: 4 }, e: { c: 5, r: 4 } }, // Email
        ];

        var cols = [
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15}
        ];

        if (steps_se[0] != steps_se[1]) merges.push({ s: { c: 0, r: steps_se[0] }, e: { c: 2, r: steps_se[0] } });
        if (sympt_se[0] != sympt_se[1]) merges.push({ s: { c: 0, r: sympt_se[0] }, e: { c: 5, r: sympt_se[0] } });
        if (acq_se[0] != acq_se[1]) merges.push({ s: { c: 0, r: acq_se[0] }, e: { c: 7, r: acq_se[0] } });
        if (bar_se[0] != bar_se[1]) merges.push({ s: { c: 0, r: bar_se[0] }, e: { c: 7, r: bar_se[0] } });
        
        
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.aoa_to_sheet(data);
        ws['!merges'] = merges;
        ws['!cols'] = cols;
        wb.SheetNames.push("Dados do Paciente");
        wb.Sheets["Dados do Paciente"] = ws;
        
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
        const final = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(final, filename + fileExtension);
    }

    /*const exportToCSV = (csvData, fileName) => {
        console.log(csvData);
        console.log(typeof csvData);
        const ws = XLSX.utils.json_to_sheet([csvData]);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['dadosPaciente'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }*/

    return (
        <Button variant="contained" color="primary" onClick={(e) => exportToCSV(csvData,filename)} endIcon={<GetAppIcon />}>Exportar</Button>
    );
}

export default function SpreadsheetGenerator (props) {
    const data = props.data;
    const name = "testando";

    return (
        <div>{ExportCSV(data)}</div>
    );
}