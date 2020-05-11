const { admin, database } = require('./admin');
const firebase = require('firebase')

module.exports = (request, response, next) => {
    let idToken;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.auth().currentUser.getIdToken()
            .then((token) => {
                idToken = token;

                admin
                .auth()
                .verifyIdToken(idToken)
                .then((decodedToken) => {
                    request.user = decodedToken;
                    return database.collection('Profissional de saude').where('userId', '==', request.user.uid).limit(1).get();
                })
                .then((data) => {
                    // request.user.email = data.docs[0].data().email;
                    request.user.id = data.docs[0].data().id;
                    return next();
                })
                .catch((error) => {
                    console.error('Error while verifying token', error);
                    return response.status(403).json(error);
                });
            })
            .catch((error) => {
                return response.status(403).json({ error: error });
            })
        } else {
            return response.status(403).json({ error: 'User not found' });
        }
    });
    
    // if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
    //     idToken = request.headers.authorization.split('Bearer ')[1];
	// } else {
	// 	console.error('No token found');
	// 	return response.status(403).json({ error: 'Unauthorized' });
    // }

	// admin
    // .auth()
    // .verifyIdToken(idToken)
    // .then((decodedToken) => {
    //     request.user = decodedToken;
    //     return database.collection('Profissional de saude').where('userId', '==', request.user.uid).limit(1).get();
    // })
    // .then((data) => {
    //     // request.user.email = data.docs[0].data().email;
    //     request.user.id = data.docs[0].data().id;
    //     return next();
    // })
    // .catch((error) => {
    //     console.error('Error while verifying token', error);
    //     return response.status(403).json(error);
    // });
};