import React from 'react';
import { HealthCheckRating } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { assertNever } from '../utils';

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
	switch (rating) {
		case HealthCheckRating.Healthy:
			return <FavoriteIcon color="success" />;
		case HealthCheckRating.LowRisk:
			return <FavoriteIcon htmlColor="#ead002" />;
		case HealthCheckRating.HighRisk:
			return <FavoriteIcon htmlColor="#e37602" />;
		case HealthCheckRating.CriticalRisk:
			return <FavoriteIcon color="error" />;
		default:
			return assertNever(rating);
	}
};

export default HealthRatingIcon;
