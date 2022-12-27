import { Button, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { addEntry, updatePatient, useStateValue } from '../state';
import { Entry, Gender, Patient } from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../modals/AddEntryModal';
import { EntryFormValues } from '../modals/AddEntryModal/AddEntryForm';

const PatientPage = () => {
	const { id: patientId } = useParams<{ id: string }>();
	const [state, dispatch] = useStateValue();
	const [patient, setPatient] = useState<Patient | undefined>();

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>();

	React.useEffect(() => {
		if (
			patientId &&
			(!state.patients[patientId] || !state.patients[patientId].ssn)
		) {
			const fetchPatient = async () => {
				try {
					const { data: patientFromApi } = await axios.get<Patient>(
						`${apiBaseUrl}/patients/${patientId}`
					);
					dispatch(updatePatient(patientFromApi));
					setPatient(patientFromApi);
				} catch (e) {
					console.error(e);
				}
			};
			void fetchPatient();
		} else if (patientId) {
			setPatient(state.patients[patientId]);
		}
	}, [dispatch]);

	if (!patient) return <p>loading...</p>;

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			if (patientId) {
				const { data: newEntry } = await axios.post<Entry>(
					`${apiBaseUrl}/patients/${patientId}/entries`,
					values
				);
				dispatch(addEntry(patientId, newEntry));
				setPatient({ ...patient, entries: patient.entries.concat([newEntry]) });
				closeModal();
			}
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.error(e?.response?.data || 'Unrecognized axios error');
				setError(
					String(e?.response?.data?.error) || 'Unrecognized axios error'
				);
			} else {
				console.error('Unknown error', e);
				setError('Unknown error');
			}
		}
	};

	return (
		<div style={{ marginTop: '1rem' }}>
			<Typography variant="h5">
				{patient.name}{' '}
				{(patient.gender === Gender.Female && <FemaleIcon />) ||
					(patient.gender === Gender.Male && <MaleIcon />)}
			</Typography>
			<p style={{ marginBottom: 0 }}>ssn: {patient.ssn}</p>
			<p style={{ marginTop: 0 }}>occupation: {patient.occupation}</p>
			<Typography variant="h6">enrties</Typography>
			{patient.entries.map(entry => {
				return <EntryDetails key={entry.id} entry={entry} />;
			})}
			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>
			<Button
				style={{ marginTop: '1rem' }}
				variant="contained"
				onClick={() => openModal()}
			>
				Add New Entry
			</Button>
		</div>
	);
};

export default PatientPage;
