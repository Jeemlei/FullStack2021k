import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = refetchReviews => {
	const [mutate] = useMutation(DELETE_REVIEW)

	const deleteReview = async id => {
		try {
			await mutate({ variables: { id } })
			console.log('Review deleted')
			await refetchReviews()
		} catch (error) {
			console.log(error)
		}
	}

	return deleteReview
}

export default useDeleteReview
