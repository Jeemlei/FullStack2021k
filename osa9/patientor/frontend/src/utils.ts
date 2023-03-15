/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

export const parseDate = (date: string) => {
	const parts = date.split('-');
	if (parts.length !== 3) return 'pp.kk.vvvv';
	return `${parts[2]}.${parts[1]}.${parts[0]}`;
};
