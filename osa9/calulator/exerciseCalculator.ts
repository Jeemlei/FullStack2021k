interface ExerciseInfo {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

interface Rating {
	rating: number
	description: string
}

const calculateRating = (average: number, target: number): Rating => {
	if (average >= target) {
		return { rating: 3, description: 'you hit your target' }
	} else if (average / target >= 0.7) {
		return { rating: 2, description: 'not too bad but could be better' }
	} else {
		return { rating: 1, description: 'you are way below your target' }
	}
}

const calculateExercises = (
	dailyHours: Array<number>,
	target: number
): ExerciseInfo => {
	const average =
		dailyHours.reduce((a: number, value: number) => a + value, 0) /
		dailyHours.length

	const success: boolean = average >= target

	const { rating, description } = calculateRating(average, target)

	return {
		periodLength: dailyHours.length,
		trainingDays: dailyHours.filter(i => i > 0).length,
		success: success,
		rating: rating,
		ratingDescription: description,
		target: target,
		average: average,
	}
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
