import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

export type Action =
	| {
			type: 'SET_PATIENT_LIST';
			payload: Patient[];
	}
	| {
			type: 'ADD_PATIENT';
			payload: Patient;
	}
	| {
			type: 'UPDATE_PATIENT';
			payload: Patient;
	}
	| {
			type: 'SET_DIAGNOSIS_LIST';
			payload: Diagnosis[];
	}
	| {
			type: 'ADD_ENTRY';
			payload: { patientId: string; entry: Entry };
	};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_PATIENT_LIST':
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients,
				},
			};
		case 'ADD_PATIENT':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		case 'UPDATE_PATIENT':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		case 'SET_DIAGNOSIS_LIST':
			return {
				...state,
				diagnoses: {
					...action.payload.reduce(
						(memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
						{}
					),
					...state.diagnoses,
				},
			};
		case 'ADD_ENTRY':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.patientId]: {
						...state.patients[action.payload.patientId],
						entries: [
							...state.patients[action.payload.patientId].entries,
							action.payload.entry,
						],
					},
				},
			};
		default:
			return state;
	}
};

export const setPatientList = (patientList: Patient[]): Action => {
	return { type: 'SET_PATIENT_LIST', payload: patientList };
};

export const addPatient = (newPatient: Patient): Action => {
	return { type: 'ADD_PATIENT', payload: newPatient };
};

export const updatePatient = (patient: Patient): Action => {
	return { type: 'UPDATE_PATIENT', payload: patient };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
	return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosisList };
};

export const addEntry = (patientId: string, entry: Entry): Action => {
	return { type: 'ADD_ENTRY', payload: { patientId, entry } };
};
