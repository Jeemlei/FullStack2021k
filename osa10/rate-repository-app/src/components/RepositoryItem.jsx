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

const RepositoryHeader = ({ img, name, desc, lang }) => {
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

const RepositoryNumbers = ({ stars, forks, reviews, rating }) => {
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
	children,
}) => {
	return (
		<View
			testID="repositoryItem"
			style={{ backgroundColor: 'white', padding: 5 }}
		>
			<RepositoryHeader img={img} name={name} desc={desc} lang={lang} />
			<RepositoryNumbers
				stars={stars}
				forks={forks}
				reviews={reviews}
				rating={rating}
			/>
			{children}
		</View>
	)
}

export default RepositoryItem
