import { useQuery } from '@apollo/client'
import { Linking, View } from 'react-native'
import { useLocation } from 'react-router-native'
import { GET_REPOSITORY_BY_ID } from '../graphql/queries'
import Button, { buttonStyles } from './Button'
import RepositoryItem from './RepositoryItem'

const RepositoryView = () => {
	const location = useLocation()
	const { data } = useQuery(GET_REPOSITORY_BY_ID, {
		variables: { id: location.state.id },
	})

	return (
		<View>
			{data && data.repository && (
				<>
					<RepositoryItem
						name={data.repository.fullName}
						desc={data.repository.description}
						lang={data.repository.language}
						stars={data.repository.stargazersCount}
						forks={data.repository.forksCount}
						reviews={data.repository.reviewCount}
						rating={data.repository.ratingAverage}
						img={data.repository.ownerAvatarUrl}
					>
						<Button
							onPress={() => Linking.openURL(data.repository.url)}
							style={buttonStyles.basic}
						>
							Open in GitHub
						</Button>
					</RepositoryItem>
				</>
			)}
		</View>
	)
}

export default RepositoryView
