const listHelper = require('../src/utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('of empty list is zero', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const result = listHelper.totalLikes(helper.listWithOneBlog)
		expect(result).toBe(5)
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(helper.listWithManyBlogs)
		expect(result).toBe(36)
	})
})

describe('favorite blog is returned', () => {
	test('from a list of blogs', () => {
		const result = listHelper.favoriteBlog(helper.listWithManyBlogs)
		const expected = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		}
		expect(result).toEqual(expected)
	})

	test('when there are equally popular blogs', () => {
		const result = listHelper.favoriteBlog(helper.listWithEquallyPopularBlogs)
		const expected1 = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		}
		const expected2 = {
			title: 'First class tests',
			author: 'Robert C. Martin',
			likes: 12,
		}
		expect([expected1, expected2]).toContainEqual(result)
	})
})

describe('an author with most blogs is returned', () => {
	test('from a list of blogs', () => {
		const result = listHelper.mostBlogs(helper.listWithManyBlogs)
		const expected = {
			author: 'Robert C. Martin',
			blogs: 3,
		}
		expect(result).toEqual(expected)
	})

	test('when there are many authors with the same amount of blogs', () => {
		const result = listHelper.mostBlogs(helper.listWithEqualLikesAndBlogs)
		const expected1 = {
			author: 'Robert C. Martin',
			blogs: 2,
		}
		const expected2 = {
			author: 'Edsger W. Dijkstra',
			blogs: 2,
		}
		expect([expected1, expected2]).toContainEqual(result)
	})
})

describe('an author with most likes is returned', () => {
	test('from a list of blogs', () => {
		const result = listHelper.mostLikes(helper.listWithManyBlogs)
		const expected = {
			author: 'Edsger W. Dijkstra',
			likes: 17,
		}
		expect(result).toEqual(expected)
	})

	test('when there are many authors with the same amount of likes', () => {
		const result = listHelper.mostLikes(helper.listWithEqualLikesAndBlogs)
		const expected1 = {
			author: 'Robert C. Martin',
			likes: 17,
		}
		const expected2 = {
			author: 'Edsger W. Dijkstra',
			likes: 17,
		}
		expect([expected1, expected2]).toContainEqual(result)
	})
})
