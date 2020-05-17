import React from 'react';
import Button from '@material-ui/core/Button'
import {authMiddleWare} from '../util/auth';
import axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

const data = [
    {
      "data": "09/01/1999",
      "passos": 2000
    },
    {
        "data": "10/01/1999",
        "passos": 1300
    },
    {
        "data": "11/01/1999",
        "passos": 3400
    },
    {
        "data": "12/01/1999",
        "passos": 3000
    },
  ]
    
export default function PatientDetails(props) { 
    return (    
        <div>
            <Button onClick={props.handleBackToList}>
                Voltar
            </Button>                  
            <LineChart width={900} height={450} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="passos" stroke="#8884d8" />
            </LineChart>
        </div> 
    );
}