import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
	const blog = {
		title: 'Things I Don’t Know as of 2018',
		author: 'Dan Abramov',
		url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
		likes: 0,
		user: {
			blogs: ['0'],
			username: 'test',
			name: 'testperson',
			id: '0',
		},
		id: '0',
	}
	let component

	beforeEach(() => {
		component = render(<Blog blog={blog} blogs={[blog]} setBlogs={() => {}} />)
	})

	test('renders title and author', () => {
		const titleView = component.container.querySelector('.titleView')
		expect(titleView).toHaveStyle('display: block')
		expect(titleView).toHaveTextContent('Things I Don’t Know as of 2018')
		expect(titleView).toHaveTextContent('Dan Abramov')
	})

	test('does not render url and likes by default', () => {
		expect(component.container.querySelector('.fullView')).toHaveStyle(
			'display: none'
		)
		const titleView = component.container.querySelector('.titleView')
		expect(titleView).not.toHaveTextContent(
			'https://overreacted.io/things-i-dont-know-as-of-2018/'
		)
		expect(titleView).not.toHaveTextContent('likes 0')
	})

	test('renders url and likes after pressing show-button', () => {
		const button = component.getByText('show')
		fireEvent.click(button)

		const fullView = component.container.querySelector('.fullView')
		expect(fullView).toHaveStyle('display: block')
		expect(fullView).toHaveTextContent(
			'https://overreacted.io/things-i-dont-know-as-of-2018/'
		)
		expect(fullView).toHaveTextContent('likes 0')
	})
})
