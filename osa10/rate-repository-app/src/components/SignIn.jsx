import Text from './Text'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
	button: {
		height: 50,
		margin: 10,
		marginTop: 5,
		borderRadius: 5,
		backgroundColor: theme.colors.primary,
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
})

const initialValues = {
	username: '',
	password: '',
}

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={{ backgroundColor: 'white' }}>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput
				name="password"
				placeholder="Password"
				secureTextEntry={true}
			/>
			<Pressable onPress={onSubmit}>
				<Text style={styles.button}>Sign in</Text>
			</Pressable>
		</View>
	)
}

const SignIn = () => {
	const [signIn] = useSignIn()
	const navigate = useNavigate()

	const onSubmit = async values => {
		const { username, password } = values

		try {
			const data = await signIn({ username, password })
			console.log(data)
			navigate('/')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

export default SignIn
