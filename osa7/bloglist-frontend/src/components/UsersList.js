import React from 'react'
import { useSelector } from 'react-redux'

const UsersList = () => {
	const users = useSelector(state => state.users)
	console.log('USERS:', users)
	return (
		<div>
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<td>{''}</td>
						<td>
							<b>blogs created</b>
						</td>
					</tr>
					{users.map(user => {
						return (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default UsersList
