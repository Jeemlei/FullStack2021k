import { Text as NativeText, StyleSheet, Platform } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
	text: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.body,
		fontFamily: Platform.select(theme.fonts),
		fontWeight: theme.fontWeights.normal,
	},
	colorTextSecondary: {
		color: theme.colors.textSecondary,
	},
	colorTextNegative: {
		color: 'white',
	},
	fontSizeHeading: {
		fontSize: theme.fontSizes.heading,
	},
	fontSizeSubheading: {
		fontSize: theme.fontSizes.subheading,
	},
	fontWeightBold: {
		fontWeight: theme.fontWeights.bold,
	},
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
	const textStyle = [
		styles.text,
		color === 'secondary' && styles.colorTextSecondary,
		color === 'negative' && styles.colorTextNegative,
		fontSize === 'heading' && styles.fontSizeHeading,
		fontSize === 'subheading' && styles.fontSizeSubheading,
		fontWeight === 'bold' && styles.fontWeightBold,
		style,
	]

	return <NativeText style={textStyle} {...props} />
}

export default Text
