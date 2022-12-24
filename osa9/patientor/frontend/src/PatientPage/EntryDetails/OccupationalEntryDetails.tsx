import React from 'react';
import { useStateValue } from '../../state';
import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';
import { parseDate } from '../../utils';

const OccupationalEntryDetails = ({
	entry,
}: {
	entry: OccupationalHealthcareEntry;
}) => {
	const [state] = useStateValue();
	return (
		<>
			<p>
				{parseDate(entry.date)} <WorkIcon />
				<br />
				<i>{entry.description}</i>
			</p>
			<ul>
				{entry.diagnosisCodes &&
					entry.diagnosisCodes.map(code => (
						<li key={code}>
							{code} {state.diagnoses[code].name}
						</li>
					))}
			</ul>
			<p>Employer: {entry.employerName}</p>
			<p>
				{entry.sickLeave &&
					`Sick leave: ${parseDate(entry.sickLeave.startDate)}-${parseDate(
						entry.sickLeave.endDate
					)}`}
			</p>
			<p>Diagnose by {entry.specialist}</p>
		</>
	);
};

export default OccupationalEntryDetails;
