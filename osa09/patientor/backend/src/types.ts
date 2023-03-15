export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EntryType {
	Hospital = 'Hospital',
	Occupational = 'OccupationalHealthcare',
	Check = 'HealthCheck',
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export interface HospitalEntry extends BaseEntry {
	type: EntryType.Hospital;
	discharge: {
		date: `${number}-${number}-${number}`;
		criteria: string;
	};
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: EntryType.Occupational;
	employerName: string;
	sickLeave?: {
		startDate: `${number}-${number}-${number}`;
		endDate: `${number}-${number}-${number}`;
	};
}

export interface HealthCheckEntry extends BaseEntry {
	type: EntryType.Check;
	healthCheckRating: HealthCheckRating;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NewEntryValues = {
	description: string;
	date: `${number}-${number}-${number}`;
	specialist: string;
	diagnosisCodes: Array<string>;
	type: EntryType;
	dischargeDate: `${number}-${number}-${number}`;
	dischargeCriteria: string;
	employerName: string;
	sickLeave: boolean;
	sickLeaveStartDate: `${number}-${number}-${number}`;
	sickLeaveEndDate: `${number}-${number}-${number}`;
	healthCheckRating: HealthCheckRating;
};

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatientInfo = Omit<Patient, 'ssn'>;

export type newPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export type PatientFields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	gender: unknown;
	occupation: unknown;
};
