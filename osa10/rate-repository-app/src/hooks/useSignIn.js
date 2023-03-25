import { useAuthStorage } from '../hooks/useAuthStorage'
import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'

const useSignIn = () => {
	const authStorage = useAuthStorage()
	const [mutate, result] = useMutation(SIGN_IN)
	const apolloClient = useApolloClient()

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({
			variables: { credentials: { username, password } },
		})
		await authStorage.setAccessToken(data.authenticate.accessToken)
		await apolloClient.resetStore()
		return data
	}

	return [signIn, result]
}

export default useSignIn
