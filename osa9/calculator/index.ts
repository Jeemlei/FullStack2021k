import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (isNaN(height) || isNaN(weight)) {
		res.status(400);
		res.json({
			error: 'malformatted parameters',
		});
	} else {
		const bmi = calculateBmi(height, weight);

		res.json({
			weight,
			height,
			bmi,
		});
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {
		daily_exercises,
		target,
	}: { daily_exercises: Array<number>; target: number } = req.body;

	if (
		daily_exercises === undefined ||
		target === undefined ||
		daily_exercises.length === 0
	) {
		res.status(400).send({ error: 'parameters missing' });
		return;
	}

	if (
		daily_exercises.reduce(
			(nan: boolean, value: number) => isNaN(Number(value)) || nan,
			false
		) ||
		isNaN(Number(target))
	) {
		res.status(400).send({ error: 'malformatted parameters' });
		return;
	}

	res.json(calculateExercises(daily_exercises.map(Number), Number(target)));
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
