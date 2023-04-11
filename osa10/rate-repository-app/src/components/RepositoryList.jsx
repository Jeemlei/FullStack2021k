import { FlatList, Pressable, TextInput } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from './ItemSeparator'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Picker } from '@react-native-picker/picker'
import { styles } from './FormikTextInput'

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
	const navigate = useNavigate()
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: []

	return (
		<FlatList
			data={repositoryNodes}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
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

const Searchbar = ({ setSearch }) => {
	return (
		<TextInput
			elevation={10}
			style={[styles.input, { backgroundColor: 'white', marginBottom: 0 }]}
			placeholder="Search"
			onChangeText={value => setSearch(value)}
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
	const [search, setSearch] = useState('')
	const [debouncedSearch] = useDebounce(search, 500)
	const [orderRules, setOrderRules] = useState('CREATED_AT DESC')
	const { repositories, fetchMore } = useRepositories({
		first: 10,
		searchKeyword: debouncedSearch,
		orderBy: orderRules.split(' ')[0],
		orderDirection: orderRules.split(' ')[1],
	})

	return (
		<>
			<Searchbar setSearch={setSearch} />
			<OrderSelector orderRules={orderRules} setOrderRules={setOrderRules} />
			<RepositoryListContainer
				repositories={repositories}
				onEndReach={() => fetchMore()}
			/>
		</>
	)
}

export default RepositoryList
