import { Alert, FlatList, StyleSheet, View } from 'react-native'
import Review from './Review'
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import ItemSeparator from './ItemSeparator'
import Button from './Button'
import theme from '../theme'
import { buttonStyles } from './Button'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteReview'

const styles = StyleSheet.create({
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: 'white',
	},
	button: {
		paddingLeft: 25,
		paddingRight: 25,
		fontSize: theme.fontSizes.subheading,
	},
})

const ActionButtons = ({ repoId, reviewId, refetch }) => {
	const navigate = useNavigate()
	const deleteReview = useDeleteReview(refetch)

	return (
		<View style={styles.buttonsContainer}>
			<Button
				style={[buttonStyles.basic, , styles.button]}
				onPress={() =>
					navigate('/repository', {
						state: {
							id: repoId,
						},
					})
				}
			>
				View Repository
			</Button>
			<Button
				style={[
					buttonStyles.basic,
					styles.button,
					{ backgroundColor: '#DC381F' },
				]}
				onPress={() =>
					Alert.alert(
						'Delete review',
						'Are you sure you want to delete this review?',
						[
							{
								text: 'Cancel',
								onPress: () => console.log('Cancel Pressed'),
								style: 'cancel',
							},
							{
								text: 'OK',
								onPress: () => deleteReview(reviewId),
							},
						]
					)
				}
			>
				Delete review
			</Button>
		</View>
	)
}

const MyReviews = () => {
	const { data, refetch } = useQuery(ME, {
		variables: { includeReviews: true },
		fetchPolicy: 'cache-and-network',
	})
	const reviews =
		data && data.me ? data.me.reviews.edges.map(edge => edge.node) : []

	return (
		<View style={{ flex: 1 }}>
			{data && data.me && (
				<FlatList
					data={reviews}
					renderItem={({ item }) => (
						<>
							<Review review={item} />
							<ActionButtons
								repoId={item.repository.id}
								reviewId={item.id}
								refetch={refetch}
							/>
						</>
					)}
					ItemSeparatorComponent={ItemSeparator}
					keyExtractor={({ id }) => id}
				/>
			)}
		</View>
	)
}

export default MyReviews
