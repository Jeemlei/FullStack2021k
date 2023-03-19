import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.primary,
		paddingLeft: 5,
	},
})

const AppBar = ({ children }) => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal>{children}</ScrollView>
		</View>
	)
}

export default AppBar
