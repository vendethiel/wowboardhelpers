{$} = require 'lib/dom'

module.exports = if $ '#post-list'
	that .= parentNode.parentNode # .content-bot .forum-wrapper #post-list.post-list

	that.dataset
		..url  = (document.location / '?')0 - /#[0-9]+/
		..page = (document.location == /\?page=([0-9]+)/)?1 or 1
		[..., ..topic-id, ..id]  = ..url / '/'

	that
else null