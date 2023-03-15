import React from 'react';
import { Entry, EntryType } from '../../types';
import { assertNever } from '../../utils';
import HealthCheckDetails from './HealthCheckDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalEntryDetails from './OccupationalEntryDetails';

const style = {
	border: 'solid',
	borderWidth: 'thin',
	borderRadius: '0.5rem',
	paddingLeft: '1rem',
	paddingRight: '1rem',
	marginTop: '0.5rem',
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case EntryType.Hospital:
			return (
				<div style={style}>
					<HospitalEntryDetails entry={entry} />
				</div>
			);
		case EntryType.Occupational:
			return (
				<div style={style}>
					<OccupationalEntryDetails entry={entry} />
				</div>
			);
		case EntryType.Check:
			return (
				<div style={style}>
					<HealthCheckDetails entry={entry} />
				</div>
			);
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
