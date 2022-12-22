import express from 'express';
import patientsService from '../services/patientsService';
import { PatientFields } from '../types';
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

export default router;
