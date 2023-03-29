import { useApolloClient, useMutation } from '@apollo/client'
import { REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
	const [mutate, result] = useMutation(REVIEW)
	const apolloClient = useApolloClient()

	const submitReview = async ({ ownerName, repositoryName, rating, text }) => {
		const { data } = await mutate({
			variables: {
				review: { ownerName, repositoryName, rating: Number(rating), text },
			},
		})
		await apolloClient.resetStore()
		return data
	}

	return [submitReview, result]
}

export default useCreateReview
