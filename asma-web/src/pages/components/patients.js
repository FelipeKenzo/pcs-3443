import React from 'react';

import PatientList from './patientlist'
import PatientDetails from './patientdetails'

export default function Patients(props){
    return (
    <div>{props.render? <PatientList/> : <PatientDetails/>}</div>
    )
}