import { FlatList, Linking, View } from 'react-native'
import { useLocation } from 'react-router-native'
import Button, { buttonStyles } from './Button'
import ItemSeparator from './ItemSeparator'
import RepositoryItem from './RepositoryItem'
import Review from './Review'
import useRepository from '../hooks/useRepository'

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

const RepositoryView = () => {
	const location = useLocation()
	const { repository, fetchMoreReviews } = useRepository({
		first: 10,
		id: location.state.id,
	})
	const reviews = repository
		? repository.reviews.edges.map(edge => edge.node)
		: []

	return (
		<View style={{ flex: 1 }}>
			{repository && (
				<FlatList
					data={reviews}
					onEndReached={() => fetchMoreReviews()}
					onEndReachedThreshold={0.5}
					renderItem={({ item }) => <Review review={item} />}
					ItemSeparatorComponent={ItemSeparator}
					keyExtractor={({ id }) => id}
					ListHeaderComponent={() => (
						<>
							<RepositoryInfo repository={repository} />
							<ItemSeparator />
						</>
					)}
				/>
			)}
		</View>
	)
}

export default RepositoryView
