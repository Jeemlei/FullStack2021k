import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import { View } from 'react-native'
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp'
import { useNavigate } from 'react-router-native'
import Button, { buttonStyles } from './Button'

const initialValues = {
	username: '',
	password: '',
	passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(1, 'Username must be atleast 1 character long')
		.max(30, 'Username must be at most 30 characters long')
		.required('Username is required'),
	password: yup
		.string()
		.min(5, 'Password must be atleast 5 characters long')
		.max(50, 'Password must be at most 50 characters long')
		.required('Password is required'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Password confirmation is required'),
})

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={{ backgroundColor: 'white' }}>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput name="password" placeholder="Password" secureTextEntry />
			<FormikTextInput
				name="passwordConfirmation"
				placeholder="Password confirmation"
				secureTextEntry
			/>
			<Button onPress={onSubmit} style={buttonStyles.basic}>
				Sign up
			</Button>
		</View>
	)
}

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

const SignUp = () => {
	const [signUp] = useSignUp()
	const navigate = useNavigate()

	const onSubmit = async values => {
		const { username, password } = values

		try {
			const data = await signUp({ username, password })
			console.log(data)
			navigate('/signin')
		} catch (e) {
			console.log(e)
		}
	}

	return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
