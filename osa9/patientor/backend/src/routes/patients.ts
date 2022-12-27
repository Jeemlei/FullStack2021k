import express from 'express';
import patientsService from '../services/patientsService';
import { NewEntryValues, PatientFields } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientsService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatientEntry(req.body as PatientFields);
		const addedPatient = patientsService.addPatient(newPatient);
		res.send(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.get('/:id', (req, res) => {
	try {
		res.send(patientsService.getPatientById(req.params.id));
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(404).send(errorMessage);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		res.send(
			patientsService.addEntryForPatient(req.params.id, req.body as NewEntryValues)
		);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		let status = 400;
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
			status = Number(error.name);
		}
		res.status(status).send(errorMessage);
	}
});

export default router;
