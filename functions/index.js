const express = require('express');
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

const {
    add_profile,
    get_profile,
    get_pro_profile,
    get_all_profiles,
    get_averages,
    update_profile,
    delete_profile,
    add_tokens,
    get_tokens,
    add_steps,
    add_goal
} = require('./APIs/profiles');

const {
    loginUser,
    signUpProfessional,
    signUpPatient
} = require('./APIs/users');

const {
    authProfessional,
    authPatient
} = require('./util/auth');

app.post('/profile', authPatient, add_profile);

// Dados do paciente logado
app.get('/profile/', authPatient, get_profile);

// Dados do paciente com o profissional logado
app.post('/profile/p', authProfessional, get_profile);

// Dados do profissional
app.get('/profile/pro', authProfessional, get_pro_profile);

// Dados de todos os pacientes associados ao profissional logado
app.get('/profiles/', authProfessional, get_all_profiles);
app.get('/averages', authProfessional, get_averages);

// app.get('/profiles/stat', authProfessional, get_stat);
app.delete('/profiles/:PatientId', authProfessional, delete_profile);
app.put('/profiles/', authProfessional, update_profile);
app.post('/goal', authProfessional, add_goal);

// http requests envolvendo fitbit
app.put('/tokens', add_tokens);
app.post('/tokens/list', get_tokens);
app.post('/steps', add_steps);

app.post('/login', loginUser);
app.post('/signup/professional', signUpProfessional);
app.post('/signup/patient', signUpPatient);

exports.api = functions.https.onRequest(app);