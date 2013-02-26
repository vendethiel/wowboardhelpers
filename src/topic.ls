if document.getElementById 'thread'
	module.exports = that
	that.dataset
		..url = (document.location / '?')0 - /#[0-9]+/
		..id = (..url / '/')[*-1]
		..page = (document.location == /\?page=([0-9]+)/)?1 or 1