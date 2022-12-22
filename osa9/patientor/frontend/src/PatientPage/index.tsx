import { Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Gender, Patient } from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();
	const [state, dispatch] = useStateValue();
	const [patient, setPatient] = useState<Patient | undefined>();
	React.useEffect(() => {
		if (id && (!state.patients[id] || !state.patients[id].ssn)) {
			const fetchPatient = async () => {
				try {
					const { data: patientFromApi } = await axios.get<Patient>(
						`${apiBaseUrl}/patients/${id}`
					);
					dispatch(updatePatient(patientFromApi));
					setPatient(patientFromApi);
				} catch (e) {
					console.error(e);
				}
			};
			void fetchPatient();
		} else if (id) {
			setPatient(state.patients[id]);
		}
	}, [dispatch]);

	if (!patient) return <p>loading...</p>;

	return (
		<div style={{marginTop: '1rem'}}>
			<Typography variant="h5">
				{patient.name}{' '}
				{(patient.gender === Gender.Female && <FemaleIcon />) ||
					(patient.gender === Gender.Male && <MaleIcon />)}
			</Typography>
			<p style={{marginBottom: 0}}>ssn: {patient.ssn}</p>
			<p style={{margin: 0}}>occupation: {patient.occupation}</p>
		</div>
	);
};

export default PatientPage;
