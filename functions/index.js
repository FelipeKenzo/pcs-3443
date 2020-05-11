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
    get_all_profiles,
    update_profile,
    delete_profile
} = require('./APIs/profiles');

const {
    loginUser,
    signUpProfessional,
    signUpPatient
} = require('./APIs/users');

const auth = require('./util/auth');

app.post('/profiles/', add_profile);
app.get('/profile/', get_profile);
app.get('/profiles/', auth, get_all_profiles);
app.delete('/profiles/:PatientId', delete_profile);
app.put('/profiles/:PatientId', update_profile);

app.post('/login', loginUser);
app.post('/signup/professional', signUpProfessional);
app.post('/signup/patient', signUpPatient);

exports.api = functions.https.onRequest(app);