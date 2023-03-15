import React from 'react';
import { useStateValue } from '../../state';
import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { parseDate } from '../../utils';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
	const [state] = useStateValue();
	return (
		<>
			<p>
				{parseDate(entry.date)} <LocalHospitalIcon />
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
			<p>
				Discharge: {parseDate(entry.discharge.date)}
				<br />- IF: {entry.discharge.criteria}
			</p>
			<p>Diagnose by {entry.specialist}</p>
		</>
	);
};

export default HospitalEntryDetails;
