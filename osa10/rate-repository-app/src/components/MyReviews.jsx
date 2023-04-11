import { FlatList, View } from 'react-native'
import Review from './Review'
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import ItemSeparator from './ItemSeparator'

const MyReviews = () => {
	const { data } = useQuery(ME, {
		variables: { includeReviews: true },
		fetchPolicy: 'cache-and-network',
	})
	const reviews = data ? data.me.reviews.edges.map(edge => edge.node) : []

	return (
		<View style={{ flex: 1 }}>
			{data && data.me && (
				<FlatList
					data={reviews}
					renderItem={({ item }) => <Review review={item} />}
					ItemSeparatorComponent={ItemSeparator}
					keyExtractor={({ id }) => id}
				/>
			)}
		</View>
	)
}

export default MyReviews
