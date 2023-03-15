import patientsData from '../data/patients';
import {
	Patient,
	NonSensitivePatientInfo,
	newPatientEntry,
	Gender,
	Entry,
	NewEntryValues,
	EntryType,
	HospitalEntry,
	OccupationalHealthcareEntry,
	HealthCheckEntry,
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
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const addPatient = (patientEntry: newPatientEntry): Patient => {
	const newPatient = {
		id: uuid(),
		...patientEntry,
	};
	patients.push(newPatient);
	return newPatient;
};

const getPatientById = (id: string): Patient => {
	const patient = patients.find(p => p.id === id);
	if (!patient) throw new Error('Patient not found!');
	return { ...patient };
};

const addEntryForPatient = (
	patientId: string,
	entryValues: NewEntryValues
): Entry => {
	const patient = getPatientById(patientId);
	if (!patient) {
		const error = new Error('Patienti not found!');
		error.name = '404';
		throw error;
	}
	if (
		!entryValues.date ||
		!entryValues.description ||
		!entryValues.specialist
	) {
		const error = new Error('Missing one or more entry fields!');
		error.name = '400';
		throw error;
	}

	const newEntry: Entry = (() => {
		switch (entryValues.type) {
			case EntryType.Hospital:
				if (!entryValues.dischargeDate || !entryValues.dischargeCriteria) {
					const error = new Error(
						'Hospital entry missing discharge information!'
					);
					error.name = '400';
					throw error;
				}
				const hospitalEntry: HospitalEntry = {
					id: uuid(),
					description: entryValues.description,
					date: entryValues.date,
					specialist: entryValues.specialist,
					diagnosisCodes: entryValues.diagnosisCodes,
					type: entryValues.type,
					discharge: {
						date: entryValues.dischargeDate,
						criteria: entryValues.dischargeCriteria,
					},
				};
				return hospitalEntry;
			case EntryType.Occupational:
				if (
					!entryValues.employerName ||
					(entryValues.sickLeave &&
						(!entryValues.sickLeaveEndDate || !entryValues.sickLeaveStartDate))
				) {
					const error = new Error(
						'Occupational healthcare entry missing employer name or sickleave information!'
					);
					error.name = '400';
					throw error;
				}
				const ocuupationalEntry: OccupationalHealthcareEntry = {
					id: uuid(),
					description: entryValues.description,
					date: entryValues.date,
					specialist: entryValues.specialist,
					diagnosisCodes: entryValues.diagnosisCodes,
					employerName: entryValues.employerName,
					type: entryValues.type,
				};
				if (entryValues.sickLeave) {
					ocuupationalEntry.sickLeave = {
						startDate: entryValues.sickLeaveStartDate,
						endDate: entryValues.sickLeaveEndDate,
					};
				}
				return ocuupationalEntry;
			case EntryType.Check:
				if (
					!(
						0 <= entryValues.healthCheckRating &&
						entryValues.healthCheckRating <= 3
					)
				) {
					const error = new Error('Health check entry missing rating!');
					error.name = '400';
					throw error;
				}
				const checkEntry: HealthCheckEntry = {
					id: uuid(),
					description: entryValues.description,
					date: entryValues.date,
					specialist: entryValues.specialist,
					type: entryValues.type,
					healthCheckRating: entryValues.healthCheckRating,
				};
				return checkEntry;
			default:
				const error = new Error('Entry type missing or invalid!');
				error.name = '400';
				throw error;
		}
	})();
	patient.entries = patient.entries.concat([newEntry]);
	const index = patients.findIndex(p => p.id === patientId);
	patients[index] = patient;
	return newEntry;
};

export default {
	getPatients,
	getPatientsWithoutSSN,
	addPatient,
	getPatientById,
	addEntryForPatient,
};
