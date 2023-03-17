import Constants from 'expo-constants'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import AppBar from './AppBar'
import AppBarTab from './AppBarTab'
import RepositoryList from './RepositoryList'
import Text from './Text'

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.secondary,
		flexGrow: 1,
		flexShrink: 1,
	},
})

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar>
				<AppBarTab
					onPress={() => console.log('Repository text pressed')}
					text={'Repositories'}
				/>
			</AppBar>
			<RepositoryList />
		</View>
	)
}

export default Main
