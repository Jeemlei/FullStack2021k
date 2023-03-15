import { Gender, newPatientEntry, PatientFields } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name:' + name);
	}
	return name;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn) || !ssn.match(/^(\d){6}-(\d){3}.{1}$/)) {
		throw new Error('Incorrect or missing ssn:' + ssn);
	}
	return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender:' + gender);
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation:' + occupation);
	}
	return occupation;
};

const toNewPatientEntry = ({
	name,
	dateOfBirth,
	ssn,
	gender,
	occupation,
}: PatientFields): newPatientEntry => {
	const newPatient: newPatientEntry = {
		name: parseName(name),
		dateOfBirth: parseDate(dateOfBirth),
		ssn: parseSsn(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
		entries: [],
	};

	return newPatient;
};

export default toNewPatientEntry;
