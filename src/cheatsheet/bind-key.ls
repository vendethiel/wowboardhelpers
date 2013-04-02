require! lang
{$} = require 'dom'

html = $ 'html'
module.exports = bind-key = !(bind, lang-key, cb) ->
	cheatsheet[bind] = lang lang-key

	bind .= toUpperCase!charCodeAt!

	document.addEventListener 'keydown' !->
		return unless bind is it.keyCode
		return unless it.target is html #not typing
		it.preventDefault!

		cb!

bind-key.cheatsheet = cheatsheet = {}