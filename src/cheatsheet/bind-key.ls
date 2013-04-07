require! lang
{$} = require 'dom'

html = $ 'html'
module.exports = bind-key = !(binds, lang-key, cb) ->
	cheatsheet[binds.toUpperCase!chars! * ', '] = lang lang-key

	codes = binds.toUpperCase!codes!map (0+)

	document.addEventListener 'keydown' !->
		return unless it.keyCode in codes
		return unless it.target is html #not typing
		it.preventDefault!

		cb!

bind-key.cheatsheet = cheatsheet = {}