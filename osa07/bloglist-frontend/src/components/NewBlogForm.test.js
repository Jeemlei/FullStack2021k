import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('NewBlogForm component', () => {
	test('sends the correct detail on submit', () => {
		const createNewBlog = jest.fn()

		const component = render(<NewBlogForm createNewBlog={createNewBlog} />)

		const titleInput = component.container.querySelector('#title')
		const authorInput = component.container.querySelector('#author')
		const urlInput = component.container.querySelector('#url')
		const form = component.container.querySelector('form')

		fireEvent.change(titleInput, {
			target: { value: 'Things I Don’t Know as of 2018' },
		})
		fireEvent.change(authorInput, {
			target: { value: 'Dan Abramov' },
		})
		fireEvent.change(urlInput, {
			target: {
				value: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
			},
		})
		fireEvent.submit(form)

		expect(createNewBlog.mock.calls).toHaveLength(1)
		expect(createNewBlog.mock.calls[0][0].title).toBe(
			'Things I Don’t Know as of 2018'
		)
		expect(createNewBlog.mock.calls[0][0].author).toBe(
			'Dan Abramov'
		)
		expect(createNewBlog.mock.calls[0][0].url).toBe(
			'https://overreacted.io/things-i-dont-know-as-of-2018/'
		)
	})
})
