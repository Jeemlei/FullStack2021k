import React, { useRef } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form, FormikProps } from 'formik';

import {
	TextField,
	EntryTypeSelectField,
	EntryTypeOption,
	DiagnosisSelection,
	NumberField,
} from '../FormField';
import { EntryType, HealthCheckRating } from '../../types';
import { useStateValue } from '../../state';

export type EntryFormValues = {
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

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
	{ value: EntryType.Hospital, label: 'Hospital' },
	{ value: EntryType.Occupational, label: 'Occupational healthcare' },
	{ value: EntryType.Check, label: 'Health check' },
];

const today = new Date()
	.toISOString()
	.substring(0, 10) as `${number}-${number}-${number}`;

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [state] = useStateValue();
	const ref = useRef<FormikProps<EntryFormValues>>(null);
	return (
		<Formik
			innerRef={ref}
			initialValues={{
				description: '',
				date: today,
				specialist: '',
				diagnosisCodes: [],
				type: EntryType.Hospital,
				dischargeDate: today,
				dischargeCriteria: '',
				employerName: '',
				sickLeave: false,
				sickLeaveStartDate: today,
				sickLeaveEndDate: today,
				healthCheckRating: 0,
			}}
			onSubmit={onSubmit}
			validate={values => {
				const requiredError = 'Field is required';
				const formattingError = 'Formatting is incorrect';
				const errors: { [field: string]: string } = {};
				const isNotValidDate = (str: string) =>
					!/^\d{4}-\d{2}-\d{2}$/.test(str);
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				} else if (isNotValidDate(values.date)) {
					errors.date = formattingError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				switch (values.type) {
					case EntryType.Hospital:
						if (!values.dischargeDate) {
							errors.dischargeDate = requiredError;
						} else if (isNotValidDate(values.dischargeDate)) {
							errors.dischargeDate = formattingError;
						}
						if (!values.dischargeCriteria) {
							errors.dischargeCriteria = requiredError;
						}
						break;
					case EntryType.Occupational:
						if (!values.employerName) {
							errors.employerName = requiredError;
						}
						if (values.sickLeave && !values.sickLeaveStartDate) {
							errors.sickLeaveStartDate = requiredError;
						} else if (
							values.sickLeave &&
							isNotValidDate(values.sickLeaveStartDate)
						) {
							errors.sickLeaveStartDate = formattingError;
						}
						if (values.sickLeave && !values.sickLeaveEndDate) {
							errors.sickLeaveEndDate = requiredError;
						} else if (
							values.sickLeave &&
							isNotValidDate(values.sickLeaveEndDate)
						) {
							errors.sickLeaveEndDate = formattingError;
						}
						break;
					case EntryType.Check:
						if (
							!(0 <= values.healthCheckRating && values.healthCheckRating <= 3)
						) {
							errors.healthCheckRating = requiredError;
						}
						break;
					default:
						errors.type = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<EntryTypeSelectField
							label="Entry type"
							name="type"
							options={entryTypeOptions}
						/>
						<Field
							label="Date"
							placeholder={today}
							name="date"
							component={TextField}
						/>
						<Field
							label="Description"
							placeholder="Description"
							name="description"
							component={TextField}
						/>
						<Field
							label="Specialist"
							placeholder="Specialist"
							name="specialist"
							component={TextField}
						/>
						{ref.current?.values.type === EntryType.Hospital && (
							<>
								<Field
									label="Discharge date"
									placeholder="Discharge date"
									name="dischargeDate"
									component={TextField}
								/>
								<Field
									label="Discharge criteria"
									placeholder="Discharge criteria"
									name="dischargeCriteria"
									component={TextField}
								/>
							</>
						)}
						{ref.current?.values.type === EntryType.Occupational && (
							<>
								<Field
									label="Employer name"
									placeholder="Employer name"
									name="employerName"
									component={TextField}
								/>
								<label>
									<Field type="checkbox" name="sickLeave" />
									Sick leave
								</label>
								{ref.current?.values.sickLeave && (
									<>
										<Field
											label="Start date"
											placeholder="Start date"
											name="sickLeaveStartDate"
											component={TextField}
										/>
										<Field
											label="End date"
											placeholder="end date"
											name="sickLeaveEndDate"
											component={TextField}
										/>
									</>
								)}
							</>
						)}
						{ref.current?.values.type !== EntryType.Check && (
							<DiagnosisSelection
								diagnoses={Object.values(state.diagnoses)}
								setFieldValue={setFieldValue}
								setFieldTouched={setFieldTouched}
							/>
						)}
						{ref.current?.values.type === EntryType.Check && (
							<Field
								label="Health check rating"
								min={HealthCheckRating.Healthy}
								max={HealthCheckRating.CriticalRisk}
								name="healthCheckRating"
								component={NumberField}
							/>
						)}
						<Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="contained"
									style={{ float: 'left' }}
									type="button"
									onClick={onCancel}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{
										float: 'right',
									}}
									type="submit"
									variant="contained"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
