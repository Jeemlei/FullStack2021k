const dummy = blogs => 1

const totalLikes = blogs => {
	return blogs.reduce((sum, blog) => {
		return sum + blog.likes
	}, 0)
}

const favoriteBlog = blogs => {
	const favorite = blogs.reduce((previous, current) => {
		return previous.likes > current.likes ? previous : current
	})
	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	}
}

const mostBlogs = blogs => {
	const authors = blogs.reduce((list, blog) => {
		const author = list.find(a => a.author === blog.author)
		if (author) {
			author.blogs++
		} else {
			list = list.concat({ author: blog.author, blogs: 1 })
		}
		return list
	}, [])

	return authors.reduce((previous, current) => {
		return previous.blogs > current.blogs ? previous : current
	})
}

const mostLikes = blogs => {
	const authors = blogs.reduce((list, blog) => {
		const author = list.find(a => a.author === blog.author)
		if (author) {
			author.likes += blog.likes
		} else {
			list = list.concat({ author: blog.author, likes: blog.likes })
		}
		return list
	}, [])

	return authors.reduce((previous, current) => {
		return previous.likes > current.likes ? previous : current
	})
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
