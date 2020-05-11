const { database } = require('../util/admin');

exports.add_profile = (request, response) => {
    const new_profile = {
        id: request.body.id,
        nome: request.body.name,
        medicoId: request.body.doctorId,
    }
    
    database.collection(request.body.role)
    .doc(new_profile.id)
    .set(new_profile)
    .then(() => {
        return response.json(new_profile);
    })
    .catch((error) => {
        return response.status(500).json({ error: error.code});
    })
}

exports.get_profile = (request, response) => {
    database.collection("Paciente").doc(request.body.id)
    .get()
    .then((doc) => {
        let name;
        let steps;
        name = doc.data().nome;
        steps = doc.data().num_passos;
        return response.json({name: name, steps: steps });
    })
    .catch((error) => {
       return response.status(500).json({ error: error.code });
    });
};

exports.get_all_profiles = (request, response) => {
    database.collection("Paciente")
    // .where('id', '==', request.user.id)
    .where('nome', '==', 'teste')
    .get()
    .then((data) => {
        let name = [];
        data.forEach((doc) => {
            name.push({
                nome: doc.data().nome,
            });
        });
        // let steps;
        // name = doc.data();
        // steps = doc.data().num_passos;
        return response.json(name);
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