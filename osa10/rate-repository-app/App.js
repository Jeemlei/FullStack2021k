import AuthStorage from './src/utils/authStorage'
import createApolloClient from './src/utils/apolloClient'
import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client'
import AuthStorageContext from './src/hooks/useAuthStorage'
import Main from './src/components/Main'
import { StatusBar } from 'expo-status-bar'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
	return (
		<>
			<NativeRouter>
				<ApolloProvider client={apolloClient}>
					<AuthStorageContext.Provider value={authStorage}>
						<Main />
					</AuthStorageContext.Provider>
				</ApolloProvider>
			</NativeRouter>
			<StatusBar style="auto" />
		</>
	)
}

export default App
