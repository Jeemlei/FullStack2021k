import { useQuery } from '@apollo/client'
import { FlatList, Linking, StyleSheet, View } from 'react-native'
import { useLocation } from 'react-router-native'
import { GET_REPOSITORY_BY_ID } from '../graphql/queries'
import theme from '../theme'
import Button, { buttonStyles } from './Button'
import ItemSeparator from './ItemSeparator'
import RepositoryItem from './RepositoryItem'
import Text from './Text'

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

const RepositoryInfo = ({ repository }) => {
	return (
		<>
			<RepositoryItem
				name={repository.fullName}
				desc={repository.description}
				lang={repository.language}
				stars={repository.stargazersCount}
				forks={repository.forksCount}
				reviews={repository.reviewCount}
				rating={repository.ratingAverage}
				img={repository.ownerAvatarUrl}
			>
				<Button
					onPress={() => Linking.openURL(repository.url)}
					style={buttonStyles.basic}
				>
					Open in GitHub
				</Button>
			</RepositoryItem>
		</>
	)
}

const ReviewItem = ({ review }) => {
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
				<Text fontWeight="bold">{review.user.username}</Text>
				<Text color="secondary">{formatDate(review.createdAt)}</Text>
				<Text style={styles.reviewText}>{review.text}</Text>
			</View>
		</View>
	)
}

const RepositoryView = () => {
	const location = useLocation()
	const { data } = useQuery(GET_REPOSITORY_BY_ID, {
		variables: { id: location.state.id },
	})
	const reviews = data
		? data.repository.reviews.edges.map(edge => edge.node)
		: []

	return (
		<View style={{ flex: 1 }}>
			{data && data.repository && (
				<FlatList
					data={reviews}
					renderItem={({ item }) => <ReviewItem review={item} />}
					ItemSeparatorComponent={ItemSeparator}
					keyExtractor={({ id }) => id}
					ListHeaderComponent={() => (
						<>
							<RepositoryInfo repository={data.repository} />
							<ItemSeparator />
						</>
					)}
				/>
			)}
		</View>
	)
}

export default RepositoryView
