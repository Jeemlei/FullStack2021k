import { Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const tabStyle = { padding: 10, paddingBottom: 15, paddingTop: 15 }

const AppBarTab = ({ text, to }) => {
	return (
		<Link to={to}>
			<Text
				fontSize="heading"
				color="negative"
				fontWeight="bold"
				style={tabStyle}
			>
				{text}
			</Text>
		</Link>
	)
}

export const SignOutButton = ({ signOut }) => {
	return (
		<Pressable onPress={signOut}>
			<Text
				fontSize="heading"
				color="negative"
				fontWeight="bold"
				style={tabStyle}
			>
				Sign Out
			</Text>
		</Pressable>
	)
}

export default AppBarTab
