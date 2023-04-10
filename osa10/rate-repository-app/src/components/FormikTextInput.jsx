import { StyleSheet } from 'react-native'
import { useField } from 'formik'

import TextInput from './TextInput'
import Text from './Text'
import theme from '../theme'

export const styles = StyleSheet.create({
	errorText: {
		marginLeft: 11,
		marginBottom: 5,
		color: theme.colors.error,
	},
	input: {
		height: 50,
		margin: 10,
		paddingLeft: 15,
		borderWidth: 1,
		borderRadius: 5,
	},
	errorInput: {
		borderColor: theme.colors.error,
		marginBottom: 3,
	},
})

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name)
	const showError = meta.touched && meta.error
	const inputStyles = [styles.input, showError && styles.errorInput]

	return (
		<>
			<TextInput
				onChangeText={value => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				error={showError}
				style={inputStyles}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	)
}

export default FormikTextInput
