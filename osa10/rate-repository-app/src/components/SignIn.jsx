import Text from './Text'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
	input: {
		height: 50,
		margin: 10,
		paddingLeft: 15,
		borderWidth: 1,
		borderRadius: 5,
	},
	button: {
		height: 50,
		margin: 10,
		marginTop: 5,
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		color: theme.colors.secondary,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
})

const initialValues = {
	username: '',
	password: '',
}

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={{ backgroundColor: 'white' }}>
			<FormikTextInput
				name="username"
				placeholder="Username"
				style={styles.input}
			/>
			<FormikTextInput
				name="password"
				placeholder="Password"
				secureTextEntry={true}
				style={styles.input}
			/>
			<Pressable onPress={onSubmit}>
				<Text style={styles.button}>Sign in</Text>
			</Pressable>
		</View>
	)
}

const SignIn = () => {
	const onSubmit = values => {
		console.log(values)
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

export default SignIn
