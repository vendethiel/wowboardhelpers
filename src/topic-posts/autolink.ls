return unless topic

for post in QSA '.post-detail'
	# should probably lookahead in autolink module, uh?
	# .post.blizzard .post-interior table tr td .post-detail
	continue if post.parentNode.parentNode.parentNode.parentNode.parentNode
		.classList.contains 'blizzard'

	el-autolink post