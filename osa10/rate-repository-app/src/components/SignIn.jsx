import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import { View } from 'react-native'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import Button, { buttonStyles } from './Button'

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
			<Button onPress={onSubmit} style={buttonStyles.basic}>
				Sign in
			</Button>
		</View>
	)
}

export const SignInContainer = ({ onSubmit }) => {
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

	return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
