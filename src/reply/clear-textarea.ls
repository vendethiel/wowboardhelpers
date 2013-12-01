require! <[../textarea ../topic]>
{$, el} = require 'lib/dom'
template-clear-textarea = require './templates/clear-textarea'

clearer = el template-clear-textarea!

if $ '.editor1'
	that.insertBefore clearer, textarea

	clearer.onclick = !->
		textarea.value = ''
		# manually clearing localStorage is something I'd like to avoid
		# emit an event ?
		localStorage.removeItem "post_#{topic.dataset.id}"