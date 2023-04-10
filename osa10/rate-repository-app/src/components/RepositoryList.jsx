import { FlatList, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from './ItemSeparator'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

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

const OrderSelector = ({ orderRules, setOrderRules }) => {
	return (
		<Picker
			selectedValue={orderRules}
			onValueChange={itemValue => setOrderRules(itemValue)}
		>
			<Picker.Item label="Latest repositories" value={'CREATED_AT DESC'} />
			<Picker.Item
				label="Highest rated repositories"
				value={'RATING_AVERAGE DESC'}
			/>
			<Picker.Item
				label="Lowest rated repositories"
				value={'RATING_AVERAGE ASC'}
			/>
		</Picker>
	)
}

const RepositoryList = () => {
	const [orderRules, setOrderRules] = useState('CREATED_AT DESC')
	const { repositories } = useRepositories(
		orderRules.split(' ')[0],
		orderRules.split(' ')[1]
	)

	return (
		<>
			<OrderSelector orderRules={orderRules} setOrderRules={setOrderRules} />
			<RepositoryListContainer repositories={repositories} />
		</>
	)
}

export default RepositoryList
