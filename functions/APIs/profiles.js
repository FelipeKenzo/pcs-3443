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

// precisa testar
exports.get_profile = (request, response) => {

    database.collection('Paciente')
    .doc(request.body.id)
    .get()
    .then((doc) => {
        let datas = [];
        datas.push({
            firstname: doc.data().firstname,
            proid: doc.data().proid,
            height: doc.data().height,
            weight: doc.data().weight,
            lastname: doc.data().lastname,
            email: doc.data().email,
            phoneNumber: doc.data().phoneNumber,
            acq: doc.data().acq,
            bar: doc.data().bar,
            fitBitNum: doc.data().fitBitNum || '-1'
            // goal_array: doc.data().goal_array,
        })
        return datas;
    })
    .then((datas) => {
        let arr = [];
        let arr_goal = [];
        let arr_symp = [];
        let arr_obs = [];
        database.collection('Paciente')
        .doc(request.body.id)
        .collection('Diario')
        .orderBy("date", "desc").limit(3)
        .get()
        .then((doc) => {
            if (!doc.empty) {
                doc.forEach((doc) => {
                    arr.push({
                        date: doc.data().date || '0',
                        steps: doc.data().steps || '0'
                    })
                    arr_goal.push({
                        date: doc.data().date || '0',
                        goal: doc.data().goal || '0'
                    })
                    arr_symp.push({
                        date: doc.data().date || '0',
                        sintomas: doc.data().Sintomas || '0'
                    })
                    arr_obs.push({
                        date: doc.data().date || '0',
                        sintomas: doc.data().obs || '0'
                    })
                })
                // console.log(datas[0].goal_array)
                datas[0].history_array = arr;
                datas[0].goal_array = arr_goal;
                datas[0].sintomas = arr_symp;
                datas[0].obs = arr_obs;
                // console.log(datas);
                return datas;
            } else {
                var i;
                for (i = 0; i < 3; i++) {
                    arr.push({
                        date: '0',
                        steps: '0'
                    })
                    arr_goal.push({
                        date: '0',
                        goal: '0'
                    })
                }
                datas[0].history_array = arr;
                datas[0].goal_array = arr_goal;
                return datas;
            }
        })
        .then((datas) => {
            if (datas[0].history_array != null) {
                // console.log(datas);
                let average = 0;
                // console.log(datas[0].history_array);
                let len = Object.keys(datas[0].history_array).length;
                datas[0].history_array.forEach((data) => {
                    average += Number(data.steps);
                })
                average /= len;
                datas[0].average = average;
            }
            return datas;
        })
        .then((datas) => {
            let arr = [];
            database.collection('Paciente')
            .doc(request.body.id)
            .collection('Diario')
            .where('acq', 'array-contains-any', [0, 1, 2, 3, 4, 5, 6])
            .get()
            .then((doc) => {
                if (!doc.empty) {
                    doc.forEach((doc) => {
                        // console.log(doc.data());
                        arr.push({
                            date: doc.data().date || '0',
                            answers: doc.data().acq || '0'
                        })
                    })
                    datas[0].acq = arr;
                    // console.log(datas);
                    return response.json(datas);
                } else {
                    datas[0].acq = [];
                    return response.json(datas);
                }
            })
            .catch((error) => {
                console.error('Error while reading files', error);
                return response.status(403).json(error);
            });
            return null
        })
        .catch((error) => {
            console.error('Error while reading files', error);
            return response.status(403).json(error);
        });
        return null;
    })
    .catch((error) => {
        console.error('Error while verifying token', error);
        return response.status(403).json(error);
    });
};

exports.get_pro_profile = (request, response) => {
    database.collection("Profissional de saude")
    .doc(request.body.proid)
    .get()
    .then((doc) => {
        let datas = [];
        datas.push({
            firstname: doc.data().firstname,
            email: doc.data().email,
            lastname: doc.data().lastname,
        })
        return response.json(datas);
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
                lastname: doc.data().lastname,
                // phoneNumber: doc.data().phoneNumber,
                // goal_array: doc.data().goal_array,
                email: doc.data().email,
                // height: doc.data().height,
                // weight: doc.data().weight,
            });
        });
        // let steps;
        // name = doc.data();
        // steps = doc.data().num_passos;
        // return datas;
        return response.json(datas);
    })
    .catch((error) => {
        return response.status(403).json(error);
    });
}

exports.get_averages = (request, response) => {
    database.collection("Paciente")
    .where('proid', '==', request.body.proid)
    .get()
    .then((data) => {
        let datas = [];
        data.forEach((doc) => {
            datas.push({
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                // phoneNumber: doc.data().phoneNumber,
                // goal_array: doc.data().goal_array,
                email: doc.data().email,
                // height: doc.data().height,
                // weight: doc.data().weight,
            });
        });
        // let steps;
        // name = doc.data();
        // steps = doc.data().num_passos;
        // return datas;
        return datas;
    })
    .then((datas) => {
        var average_array = [];
        var promises = [];
        datas.forEach((pac) => {
            promises.push(
                database.collection('Paciente')
                .doc(pac.email)
                .collection('Diario')
                .get()
                .then((data) => {
                    let avg = 0;
                    let count = 0;
                    // console.log(data[0]);
                    // let len = Object.keys(data[0]).length;
                    data.forEach((data) => {
                        if (data.data().steps) {
                            // console.log(data.data());
                            avg += Number(data.data().steps);
                        }
                        count++;
                    })
                    avg /= count;
                    average_array.push({average: avg || 0, id: pac.email});
                    // console.log(average_array);
                    return true;
                })
                .catch((error) => {
                    return response.status(403).json(error);
                })
            )
        })
        Promise.all(promises).then(() => {
            datas.push({"average_array": average_array});
            return response.json(datas);
        })
        .catch((error) => {
            return response.status(403).json(error);
        });
        return null;
    })
    .catch((error) => {
        return response.status(403).json(error);
    });
}

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
    let document = database.collection("Paciente").doc(request.body.id);
    document.update(request.body)
    .then(() => {
        return response.json({ message: 'Atualizado com sucesso'});
    })
    .catch((error) => {
        return response.status(500).json({ error: error.code });
    })
}

exports.add_goal = (request, response) => {
    database.collection("Paciente")
    .doc(request.body.patient_id)
    .collection("Diario")
    .where('date', '==', request.body.date).limit(1).get()
    .then((data) => {
        if (data.docs[0] != null) {
            database.collection("Paciente")
            .doc(request.body.patient_id)
            .collection("Diario")
            .doc(data.docs[0].id)
            .update({goal: request.body.goal})
            .then(() => {
                return response.json({ message: 'Atualizado com sucesso'});
            })
            .catch((error) => {
                return response.status(500).json({ error: error.code });
            })
        } else {
            database.collection("Paciente")
            .doc(request.body.patient_id)
            .collection("Diario")
            .add({goal: request.body.goal, date: request.body.date})
            .then(() => {
                return response.json({ message: 'Atualizado com sucesso'});
            })
            .catch((error) => {
                return response.status(500).json({ error: error.code });
            })
        }
        return null
    })
    .catch((error) => {
        return response.status(500).json({ error: error.code });
    })
}

// exports.add_tokens = (request, response) => {
//     let document = database.collection("Paciente").doc(request.body.id);
//     const tokens = {
//         access_token: request.body.access_token,
//         refresh_token: request.body.refresh_token,
//         fitbit_id: request.body.fitbit_id,
//     }
//     let token_check = "MynameisYoshikageKira.I'm33yearsold.MyhouseisinthenortheastsectionofMorioh,whereallthevillasare,andIamnotmarried.IworkasanemployeefortheKameYudepartmentstores,andIgethomeeverydayby8PMatthelatest.Idon'tsmoke,butIoccasionallydrink.I'minbedby11PM,andmakesureIgeteighthoursofsleep,nomatterwhat.Afterhavingaglassofwarmmilkanddoingabouttwentyminutesofstretchesbeforegoingtobed,Iusuallyhavenoproblemssleepinguntilmorning.Justlikeababy,Iwakeupwithoutanyfatigueorstressinthemorning.Iwastoldtherewerenoissuesatmylastcheck-up.I'mtryingtoexplainthatI'mapersonwhowishestoliveaveryquietlife.Itakecarenottotroublemyselfwithanyenemies,likewinningandlosing,thatwouldcausemetolosesleepatnight.ThatishowIdealwithsociety,andIknowthatiswhatbringsmehappiness.Although,ifIweretofightIwouldn'tlosetoanyone."
//     if (request.body.token == token_check) {
//         document.update(tokens)
//         .then(() => {
//             return response.json({ message: 'Atualizado com sucesso'});
//         })
//         .catch((error) => {
//             return response.status(500).json({ error: error.code });
//         })
//     } else {
//         return response.status(403).json({ error: 'Unauthorized' });
//     }
// }

exports.add_steps = (request, response) => {
    let token_check = "MynameisYoshikageKira.I'm33yearsold.MyhouseisinthenortheastsectionofMorioh,whereallthevillasare,andIamnotmarried.IworkasanemployeefortheKameYudepartmentstores,andIgethomeeverydayby8PMatthelatest.Idon'tsmoke,butIoccasionallydrink.I'minbedby11PM,andmakesureIgeteighthoursofsleep,nomatterwhat.Afterhavingaglassofwarmmilkanddoingabouttwentyminutesofstretchesbeforegoingtobed,Iusuallyhavenoproblemssleepinguntilmorning.Justlikeababy,Iwakeupwithoutanyfatigueorstressinthemorning.Iwastoldtherewerenoissuesatmylastcheck-up.I'mtryingtoexplainthatI'mapersonwhowishestoliveaveryquietlife.Itakecarenottotroublemyselfwithanyenemies,likewinningandlosing,thatwouldcausemetolosesleepatnight.ThatishowIdealwithsociety,andIknowthatiswhatbringsmehappiness.Although,ifIweretofightIwouldn'tlosetoanyone."

    database.collection("Paciente")
    .doc(request.body.email)
    .collection("Diario")
    .where('date', '==', request.body.date).limit(1).get()
    .then((data) => {
        if (request.body.token == token_check) {
            if (data.docs[0] != null) {
                database.collection("Paciente")
                .doc(request.body.email)
                .collection("Diario")
                .doc(data.docs[0].id)
                .update({steps: request.body.steps})
                .then(() => {
                    return response.json({ message: 'Atualizado com sucesso'});
                })
                .catch((error) => {
                    return response.status(500).json({ error: error.code });
                })
            } else {
                database.collection("Paciente")
                .doc(request.body.email)
                .collection("Diario")
                .add({steps: request.body.steps, date: request.body.date})
                .then(() => {
                    return response.json({ message: 'Atualizado com sucesso'});
                })
                .catch((error) => {
                    return response.status(500).json({ error: error.code });
                })
            }
        } else {
            return response.status(403).json({ error: 'Unauthorized' });
        }
        return null
    })
    .catch((error) => {
        return response.status(500).json({ error: error.code });
    })
}

exports.add_tokens = (request, response) => {
    let document = database.collection("fitbit").doc("tokens");
    var data = {};
    var key = request.body.email;
    key = key.replace(/\./g, "$_")
    data[key] = [];
    const tokens = {
        access_token: request.body.access_token,
        refresh_token: request.body.refresh_token,
        fitbit_id: request.body.fitbit_id,
    }
    data[key].push(tokens);
    // console.log(data)
    let token_check = "MynameisYoshikageKira.I'm33yearsold.MyhouseisinthenortheastsectionofMorioh,whereallthevillasare,andIamnotmarried.IworkasanemployeefortheKameYudepartmentstores,andIgethomeeverydayby8PMatthelatest.Idon'tsmoke,butIoccasionallydrink.I'minbedby11PM,andmakesureIgeteighthoursofsleep,nomatterwhat.Afterhavingaglassofwarmmilkanddoingabouttwentyminutesofstretchesbeforegoingtobed,Iusuallyhavenoproblemssleepinguntilmorning.Justlikeababy,Iwakeupwithoutanyfatigueorstressinthemorning.Iwastoldtherewerenoissuesatmylastcheck-up.I'mtryingtoexplainthatI'mapersonwhowishestoliveaveryquietlife.Itakecarenottotroublemyselfwithanyenemies,likewinningandlosing,thatwouldcausemetolosesleepatnight.ThatishowIdealwithsociety,andIknowthatiswhatbringsmehappiness.Although,ifIweretofightIwouldn'tlosetoanyone."
    if (request.body.token == token_check) {
        document.update(data)
        .then(() => {
            return response.json({ message: 'Atualizado com sucesso'});
        })
        .catch((error) => {
            return response.status(500).json({ error: error.code });
        })
    } else {
        return response.status(403).json({ error: 'Unauthorized' });
    }
}

exports.get_tokens = (request, response) => {
    let token_check = "MynameisYoshikageKira.I'm33yearsold.MyhouseisinthenortheastsectionofMorioh,whereallthevillasare,andIamnotmarried.IworkasanemployeefortheKameYudepartmentstores,andIgethomeeverydayby8PMatthelatest.Idon'tsmoke,butIoccasionallydrink.I'minbedby11PM,andmakesureIgeteighthoursofsleep,nomatterwhat.Afterhavingaglassofwarmmilkanddoingabouttwentyminutesofstretchesbeforegoingtobed,Iusuallyhavenoproblemssleepinguntilmorning.Justlikeababy,Iwakeupwithoutanyfatigueorstressinthemorning.Iwastoldtherewerenoissuesatmylastcheck-up.I'mtryingtoexplainthatI'mapersonwhowishestoliveaveryquietlife.Itakecarenottotroublemyselfwithanyenemies,likewinningandlosing,thatwouldcausemetolosesleepatnight.ThatishowIdealwithsociety,andIknowthatiswhatbringsmehappiness.Although,ifIweretofightIwouldn'tlosetoanyone."
    if (request.body.token == token_check) {
        database.collection("fitbit")
        .doc('tokens')
        .get()
        .then((doc) => {
            return response.json(doc.data());
        })
        .catch((error) => {
            console.error('Error while getting token', error);
            return response.status(403).json(error);
        });
    } else {
        return response.status(403).json({ error: 'Unauthorized' });
    }
};