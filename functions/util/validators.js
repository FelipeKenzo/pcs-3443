const isEmpty = (string) => {
    if (string.trim() === '') 
        return true;
	else return false;
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) 
        errors.email = 'Campo de email nao pode estar vazio';
    if (isEmpty(data.password)) 
        errors.password = 'Campo de senha nao pode estar vazio';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateProfessionalSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Esse campo nao pode estar vazio';
	} else if (!isEmail(data.email)) {
		errors.email = 'Email invalido';
	}

	if (isEmpty(data.firstname)) errors.Name = 'Esse campo nao pode estar vazio';
	if (isEmpty(data.lastname)) errors.Name = 'Esse campo nao pode estar vazio';

	if (isEmpty(data.password)) errors.password = 'Esse campo nao pode estar vazio';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validatePatientSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Esse campo nao pode estar vazio';
	} else if (!isEmail(data.email)) {
		errors.email = 'Email invalido';
	}

	if (isEmpty(data.firstname)) errors.Name = 'Esse campo nao pode estar vazio';
	if (isEmpty(data.lastname)) errors.Name = 'Esse campo nao pode estar vazio';
	if (isEmpty(data.proid)) errors.proid = 'Esse campo nao pode estar vazio';
	if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Esse campo nao pode estar vazio';
	if (isEmpty(data.weight)) errors.weight = 'Esse campo nao pode estar vazio';
	if (isEmpty(data.height)) errors.height = 'Esse campo nao pode estar vazio';

	if (isEmpty(data.password)) errors.password = 'Esse campo nao pode estar vazio';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};