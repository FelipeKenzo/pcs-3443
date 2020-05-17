const { admin, database } = require('../util/admin');

exports.add_profile = (request, response) => {
    const forms = {
        id: request.body.id,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
    }
    
    database.collection('Paciente')
    .doc(request.body.id)
    .collection('forms')
    .doc(request.body.date)
    .set(forms)
    .then(() => {
        return response.json(forms);
    })
    .catch((error) => {
        return response.status(500).json({ error: error.code});
    })
}

exports.get_profile = (request, response) => {
    database.collection('Paciente')
    // .doc(request.body.pacid)
    .doc(request.body.id)
    .get()
    .then((doc) => {
        let firstname;
        let proid;
        let height;
        // let steps;
        firstname = doc.data().firstname;
        proid = doc.data().proid;
        height = doc.data().height;
        // steps = doc.data().num_passos;
        return response.json({firstname: firstname, proid: proid, height: height });
    })
    .catch((error) => {
        console.error('Error while verifying token', error);
        return response.status(403).json(error);
    });

};

exports.get_all_profiles = (request, response) => {
    database.collection("Paciente")
    .where('proid', '==', request.body.proid)
    .get()
    .then((data) => {
        let datas = [];
        data.forEach((doc) => {
            datas.push({
                firstname: doc.data().firstname,
                phoneNumber: doc.data().phoneNumber,
            });
        });
        // let steps;
        // name = doc.data();
        // steps = doc.data().num_passos;
        return response.json(datas);
    })
    .catch((error) => {
       return response.status(500).json({ error: error.code });
    });
};

exports.delete_profile = (request, response) => {
    let document = database.collection("Paciente").doc(request.params.PatientId);
    document.get().then((doc) => {
        if (!doc.exists) {
            return response.status(404).json({ error: 'Paciente nao encontrado '});
        }
        return document.delete();
    })
    .then(() => {
        return response.json({ message: 'Removido com sucesso' });
    })
    .catch((error) => {
        return response.status(500).json({ error: error.code });
    })
}

exports.update_profile = (request, response) => {
    let document = database.collection("Paciente").doc(request.params.PatientId);
    document.update(request.body)
    .then(() => {
        return response.json({ message: 'Atualizado com sucesso'});
    })
    .catch((error) => {
        return response.status(500).json({ error: error.code });
    })
}