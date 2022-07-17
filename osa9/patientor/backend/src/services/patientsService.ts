import patientsData from '../data/patients.json';
import { Patient, NonSensitivePatientInfo } from '../types';

const patients: Array<Patient> = patientsData;

const getPatients = () => {
	return patients;
};

const getPatientsWithoutSSN = (): Array<NonSensitivePatientInfo> => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id, name, dateOfBirth, gender, occupation
	}));
};

export default {
	getPatients,
	getPatientsWithoutSSN,
};
