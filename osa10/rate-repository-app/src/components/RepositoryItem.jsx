import { Text, View } from 'react-native'

const RepositoryItem = ({
	name,
	desc,
	lang,
	stars,
	forks,
	reviews,
	rating,
}) => {
	return (
		<View>
			<Text>Full name: {name}</Text>
			<Text>Description: {desc}</Text>
			<Text>Language: {lang}</Text>
			<Text>Stars: {stars}</Text>
			<Text>Forks: {forks}</Text>
			<Text>Reviews: {reviews}</Text>
			<Text>Rating: {rating}</Text>
		</View>
	)
}

export default RepositoryItem
