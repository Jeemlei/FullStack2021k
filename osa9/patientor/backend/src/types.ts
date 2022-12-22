export interface Diagnose {
	code: string
	name: string
	latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
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
	name: unknown
	dateOfBirth: unknown
	ssn: unknown
	gender: unknown
	occupation: unknown
};
