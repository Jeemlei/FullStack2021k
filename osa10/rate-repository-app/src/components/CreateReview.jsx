import { Formik } from 'formik'
import { View } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import Button, { buttonStyles } from './Button'
import FormikTextInput from './FormikTextInput'

const initialValues = {
	ownerName: '',
	repositoryName: '',
	rating: '',
	text: '',
}

const validationSchema = yup.object().shape({
	ownerName: yup.string().required('Repository owner name is required'),
	repositoryName: yup.string().required('Repository name is required'),
	rating: yup
		.number()
		.typeError('Rating must be a number between 0 and 100')
		.min(0, "Rating can't be less than 0")
		.max(100, "Rating can't be over 100")
		.required('Rating is a required'),
	text: yup.string().optional(),
})

const ReviewForm = ({ onSubmit }) => {
	return (
		<View style={{ backgroundColor: 'white' }}>
			<FormikTextInput name="ownerName" placeholder="Repository owner name" />
			<FormikTextInput name="repositoryName" placeholder="Repository name" />
			<FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
			<FormikTextInput name="text" placeholder="Review" />
			<Button onPress={onSubmit} style={buttonStyles.basic}>
				Create a review
			</Button>
		</View>
	)
}

const CreateReviewContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

const CreateReview = () => {
	const [submitReview] = useCreateReview()
	const navigate = useNavigate()

	const onSubmit = async values => {
		try {
			const data = await submitReview(values)
			navigate('/repository', {
				state: {
					id: data.createReview.repositoryId,
				},
			})
		} catch (e) {
			console.log(e)
		}
	}
	return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReview
