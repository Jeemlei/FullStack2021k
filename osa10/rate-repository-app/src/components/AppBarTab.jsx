import { Link } from 'react-router-native'
import Text from './Text'

const AppBarTab = ({ text, to }) => {
	return (
		<Link to={to}>
			<Text
				fontSize="heading"
				color="negative"
				fontWeight="bold"
				style={{ padding: 10, paddingBottom: 15, paddingTop: 15 }}
			>
				{text}
			</Text>
		</Link>
	)
}

export default AppBarTab
