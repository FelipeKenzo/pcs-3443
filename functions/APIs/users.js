const { admin, database } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateProfessionalSignUpData, validatePatientSignUpData } = require('../util/validators');

exports.loginUser = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(user);
	if (!valid) return response.status(400).json(errors);

    firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return response.json({ token });
    })
    .catch((error) => {
        console.error(error);
        return response.status(403).json({ general: 'wrong credentials, please try again'});
    })
};

exports.signUpProfessional = (request, response) => {
    const newUser = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword,
    };

    const { valid, errors } = validateProfessionalSignUpData(newUser);

	if (!valid) return response.status(400).json(errors);

    let token, userId;
    database.collection("Profissional de saude").doc(`${newUser.email}`)
    .get()
    .then((doc) => {
        if (doc.exists) {
            return response.status(400).json({ email: 'Email already in use' });
        } else {
            return firebase
                   .auth()
                   .createUserWithEmailAndPassword(
                        newUser.email, 
                        newUser.password
                   );
        }
    })
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idtoken) => {
        token = idtoken;
        const userCredentials = {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            userId
        };
        return database
               .collection("Profissional de saude")
               .doc(`${newUser.email}`)
               .set(userCredentials);
    })
    .then(()=>{
        return response.status(201).json({ token });
    })
    .catch((error) => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
            return response.status(400).json({ email: 'Email already in use' });
        } else {
            return response.status(500).json({ general: 'Something went wrong, please try again' });
        }
    });
}

exports.signUpPatient = (request, response) => {
    const newUser = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        proid: request.body.proid,
        phoneNumber: request.body.phoneNumber,
        height: request.body.height,
        weight: request.body.weight,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword,
    };

    const { valid, errors } = validatePatientSignUpData(newUser);

	if (!valid) return response.status(400).json(errors);

    let token, userId;
    database.collection("Paciente").doc(`${newUser.email}`)
    .get()
    .then((doc) => {
        if (doc.exists) {
            return response.status(400).json({ email: 'Email already in use' });
        } else {
            return firebase
                   .auth()
                   .createUserWithEmailAndPassword(
                        newUser.email, 
                        newUser.password
                   );
        }
    })
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idtoken) => {
        token = idtoken;
        const userCredentials = {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            proid: request.body.proid,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            height: newUser.height,
            weight: newUser.weight,
            userId
        };
        return database
               .collection("Paciente")
               .doc(`${newUser.email}`)
               .set(userCredentials);
    })
    .then(()=>{
        return response.status(201).json({ token });
    })
    .catch((error) => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
            return response.status(400).json({ email: 'Email already in use' });
        } else {
            return response.status(500).json({ general: 'Something went wrong, please try again' });
        }
    });
}