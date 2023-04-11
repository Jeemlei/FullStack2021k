import { useQuery } from '@apollo/client'
import { FlatList, Linking, View } from 'react-native'
import { useLocation } from 'react-router-native'
import { GET_REPOSITORY_BY_ID } from '../graphql/queries'
import Button, { buttonStyles } from './Button'
import ItemSeparator from './ItemSeparator'
import RepositoryItem from './RepositoryItem'
import Review from './Review'

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
	const { data } = useQuery(GET_REPOSITORY_BY_ID, {
		fetchPolicy: 'cache-and-network',
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
					renderItem={({ item }) => <Review review={item} />}
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
