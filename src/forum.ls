module.exports = if document.getElementById 'posts'
	that.dataset
		..<[url query]> = document.location / '?'
		..page = (document.location == /\?page=([0-9]+)/)?1 or 1
		..id = (that.dataset.url / '/')[*-2]
	that
else null