import patientsData from '../data/patients.json';
import {
	Patient,
	NonSensitivePatientInfo,
	newPatientEntry,
	Gender,
} from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData.map(p => {
	switch (p.gender) {
		case Gender.Male:
			p.gender = Gender.Male;
			break;
		case Gender.Female:
			p.gender = Gender.Female;
			break;
		case Gender.Other:
			p.gender = Gender.Other;
			break;
		default:
			throw new Error('Patient data missing gender info');
	}
	return p;
}) as Array<Patient>;

const getPatients = () => {
	return patients;
};

const getPatientsWithoutSSN = (): Array<NonSensitivePatientInfo> => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patientEntry: newPatientEntry): Patient => {
	const newPatient = {
		id: uuid(),
		...patientEntry,
	};
	patients.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	getPatientsWithoutSSN,
	addPatient,
};
