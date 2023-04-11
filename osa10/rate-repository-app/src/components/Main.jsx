import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native'
import theme from '../theme'
import AppBar from './AppBar'
import AppBarTab, { tabStyle } from './AppBarTab'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import { ME } from '../graphql/queries'
import { useApolloClient, useQuery } from '@apollo/client'
import { useAuthStorage } from '../hooks/useAuthStorage'
import Button from './Button'
import RepositoryView from './RepositoryView'
import CreateReview from './CreateReview'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.secondary,
		flexGrow: 1,
		flexShrink: 1,
	},
})

const Main = () => {
	const authStorage = useAuthStorage()
	const apolloClient = useApolloClient()
	const navigate = useNavigate()
	const { data } = useQuery(ME, {
		fetchPolicy: 'network-only',
	})

	const signOut = async () => {
		await authStorage.removeAccessToken()
		await apolloClient.resetStore()
		navigate('/')
	}

	return (
		<View style={styles.container}>
			<AppBar>
				<AppBarTab text={'Repositories'} to={'/'} />
				{data && data.me ? (
					<>
						<AppBarTab text={'Create a review'} to={'/review'} />
						<AppBarTab text={'My reviews'} to={'/myreviews'} />
						<Button onPress={signOut} style={tabStyle}>
							Sign out
						</Button>
					</>
				) : (
					<>
						<AppBarTab text={'Sign in'} to={'/signin'} />
						<AppBarTab text={'Sign up'} to={'/signup'} />
					</>
				)}
			</AppBar>
			<Routes>
				<Route path="/" element={<RepositoryList />} exact />
				<Route path="/signin" element={<SignIn />} exact />
				<Route path="/signup" element={<SignUp />} exact />
				<Route path="/repository" element={<RepositoryView />} exact />
				<Route path="/review" element={<CreateReview />} exact />
				<Route path="/myreviews" element={<MyReviews />} exact />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	)
}

export default Main
