import { Image, StyleSheet, View } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
	image: {
		width: 45,
		height: 45,
		borderRadius: 5,
		margin: 10,
	},
	info: {
		display: 'flex',
		margin: 10,
		flexShrink: 1,
	},
	reponame: {
		margin: 4,
		marginTop: 0,
	},
	description: {
		margin: 4,
	},
	langtag: {
		backgroundColor: theme.colors.primary,
		margin: 4,
		borderRadius: 3,
		padding: 3,
		paddingLeft: 5,
		paddingRight: 5,
	},
	details: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	detail: {
		alignItems: 'center',
		marginBottom: 5,
	},
})

const RepositoryInfo = ({ img, name, desc, lang }) => {
	return (
		<View style={{ flexDirection: 'row' }}>
			<Image source={{ uri: img }} style={styles.image} />
			<View style={styles.info}>
				<Text fontWeight="bold" style={styles.reponame}>
					{name}
				</Text>
				<Text color="secondary" style={styles.description}>
					{desc}
				</Text>
				<View style={{ flexDirection: 'row' }}>
					<Text color="negative" style={styles.langtag}>
						{lang}
					</Text>
				</View>
			</View>
		</View>
	)
}

const RepositoryDetails = ({ stars, forks, reviews, rating }) => {
	const formatThousands = number =>
		number >= 1000 ? `${(number / 1000).toFixed(1)}k` : `${number}`
	return (
		<View style={styles.details}>
			<View style={styles.detail}>
				<Text fontWeight="bold">{formatThousands(stars)}</Text>
				<Text color="secondary">Stars</Text>
			</View>
			<View style={styles.detail}>
				<Text fontWeight="bold">{formatThousands(forks)}</Text>
				<Text color="secondary">Forks</Text>
			</View>
			<View style={styles.detail}>
				<Text fontWeight="bold">{formatThousands(reviews)}</Text>
				<Text color="secondary">Reviews</Text>
			</View>
			<View style={styles.detail}>
				<Text fontWeight="bold">{formatThousands(rating)}</Text>
				<Text color="secondary">Rating</Text>
			</View>
		</View>
	)
}

const RepositoryItem = ({
	name,
	desc,
	lang,
	stars,
	forks,
	reviews,
	rating,
	img,
}) => {
	return (
		<View style={{ backgroundColor: 'white', padding: 5 }}>
			<RepositoryInfo img={img} name={name} desc={desc} lang={lang} />
			<RepositoryDetails
				stars={stars}
				forks={forks}
				reviews={reviews}
				rating={rating}
			/>
		</View>
	)
}

export default RepositoryItem
