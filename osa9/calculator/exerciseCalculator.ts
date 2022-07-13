interface ExerciseHours {
	dailyHours: Array<number>,
	target: number
}

interface Rating {
	rating: number
	description: string
}

interface ExerciseInfo {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

const parseExerciseInput = (args: Array<string>): ExerciseHours => {
	if (args.length < 4) throw new Error('Not enough arguments');

	if (args.slice(2).reduce((a: boolean, value:unknown): boolean => a && !isNaN(Number(value)), true)) {
		return {
            dailyHours: args.slice(3).map(Number),
            target: Number(args[2])
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

const calculateRating = (average: number, target: number): Rating => {
	if (average >= target) {
		return { rating: 3, description: 'you hit your target' };
	} else if (average / target >= 0.7) {
		return { rating: 2, description: 'not too bad but could be better' };
	} else {
		return { rating: 1, description: 'you are way below your target' };
	}
};

const calculateExercises = (
	dailyHours: Array<number>,
	target: number
): ExerciseInfo => {
	const average =
		dailyHours.reduce((a: number, value: number) => a + value, 0) /
		dailyHours.length;

	const success: boolean = average >= target;

	const { rating, description } = calculateRating(average, target);

	return {
		periodLength: dailyHours.length,
		trainingDays: dailyHours.filter(i => i > 0).length,
		success: success,
		rating: rating,
		ratingDescription: description,
		target: target,
		average: average,
	};
};

try {
	const { dailyHours, target } = parseExerciseInput(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error) {
	let errorMessage = 'Something went wrong.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
