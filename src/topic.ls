module.exports = if document.getElementById 'thread'
	that.dataset
		..url  = (document.location / '?')0 - /#[0-9]+/
		..page = (document.location == /\?page=([0-9]+)/)?1 or 1
		[..., ..topic-id, ..id]  = ..url / '/'

	that
else null