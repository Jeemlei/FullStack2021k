import {
	Platform,
	StyleSheet,
	TextInput as NativeTextInput,
} from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
	font: {
		fontFamily: Platform.select(theme.fonts),
	},
})

const TextInput = ({ style, error, ...props }) => {
	const textInputStyle = [style, styles.font]

	return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
