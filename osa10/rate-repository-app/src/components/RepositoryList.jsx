import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from './ItemSeparator'

export const RepositoryListContainer = ({ repositories }) => {
	const navigate = useNavigate()
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: []

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<Pressable
					onPress={() =>
						navigate('/repository', {
							state: {
								id: item.id,
							},
						})
					}
				>
					<RepositoryItem
						name={item.fullName}
						desc={item.description}
						lang={item.language}
						stars={item.stargazersCount}
						forks={item.forksCount}
						reviews={item.reviewCount}
						rating={item.ratingAverage}
						img={item.ownerAvatarUrl}
					/>
				</Pressable>
			)}
		/>
	)
}

const RepositoryList = () => {
	const { repositories } = useRepositories()

	return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
