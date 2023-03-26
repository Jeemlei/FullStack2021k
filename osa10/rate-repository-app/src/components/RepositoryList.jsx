import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: []

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
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
			)}
		/>
	)
}

const RepositoryList = () => {
	const { repositories } = useRepositories()

	return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
