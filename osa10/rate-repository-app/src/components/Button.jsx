import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'

export const buttonStyles = StyleSheet.create({
	basic: {
		height: 50,
		margin: 10,
		marginTop: 5,
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
})

const Button = ({ onPress, style, children }) => {
	return (
		<Pressable onPress={onPress}>
			<Text fontSize="heading" color="negative" fontWeight="bold" style={style}>
				{children}
			</Text>
		</Pressable>
	)
}

export default Button
