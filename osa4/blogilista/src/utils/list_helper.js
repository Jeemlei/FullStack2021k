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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
}
