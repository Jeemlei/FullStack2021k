import React from 'react';
import { HealthCheckEntry } from '../../types';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthRatingIcon from '../../components/HealthRatingIcon';
import { parseDate } from '../../utils';

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
	return (
		<>
			<p style={{ marginBottom: 0 }}>
				{parseDate(entry.date)} <MedicalInformationIcon />
				<br />
				<i>{entry.description}</i>
			</p>
			<HealthRatingIcon rating={entry.healthCheckRating} />
			<p style={{ marginTop: 0 }}>Diagnose by {entry.specialist}</p>
		</>
	);
};

export default HealthCheckDetails;
