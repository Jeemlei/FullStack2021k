import { Pressable } from 'react-native'
import Text from './Text'

const AppBarTab = ({ onPress, text }) => {
	return (
		<Pressable onPress={onPress}>
			<Text
				fontSize="heading"
				color="secondary"
				fontWeight="bold"
				style={{ padding: 10 }}
			>
				{text}
			</Text>
		</Pressable>
	)
}

export default AppBarTab
