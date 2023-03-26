import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

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
	const { data } = useQuery(ME, {
		fetchPolicy: "network-only",
	})

	const signOut = async () => {
		await authStorage.removeAccessToken()
		await apolloClient.resetStore()
	}

	return (
		<View style={styles.container}>
			<AppBar>
				<AppBarTab text={'Repositories'} to={'/'} />
				{data && data.me ? (
					<Button onPress={signOut} style={tabStyle}>
						Sign out
					</Button>
				) : (
					<AppBarTab text={'Sign in'} to={'/signin'} />
				)}
			</AppBar>
			<Routes>
				<Route path="/" element={<RepositoryList />} exact />
				<Route path="/signin" element={<SignIn />} exact />
				<Route path="/repository" element={<RepositoryView />} exact />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	)
}

export default Main
