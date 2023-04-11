import { StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
	review: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		padding: 15,
	},
	rating: {
		width: 45,
		height: 45,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		borderRadius: 25,
		padding: 10,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: theme.colors.primary,
	},
	reviewDetails: {
		flexShrink: 1,
		marginLeft: 15,
		marginRight: 5,
	},
	reviewText: {
		marginTop: 5,
	},
})

const Review = ({ review }) => {
	const formatDate = dateString => {
		const dateArray = dateString.split('T')[0].split('-')
		return `${Number(dateArray[2])}.${Number(dateArray[1])}.${dateArray[0]}`
	}

	return (
		<View style={styles.review}>
			<View>
				<Text fontWeight="bold" style={styles.rating}>
					{review.rating}
				</Text>
			</View>
			<View style={styles.reviewDetails}>
				{review.repository && (
					<Text fontWeight="bold">{review.repository.fullName}</Text>
				)}
				{review.user && <Text fontWeight="bold">{review.user.username}</Text>}
				<Text color="secondary">{formatDate(review.createdAt)}</Text>
				<Text style={styles.reviewText}>{review.text}</Text>
			</View>
		</View>
	)
}

export default Review
