require! <[../cheatsheet/bind-key ../textarea ../w]>
{$} = require 'dom'

bind-key 'r' 'quick-quote' !->
	if w.getSelection!toString!
		textarea
			..value += (if ..value then "\n" else "") + "[quote]#that[/quote]"
			..selectionStart = ..selectionEnd = ..value.length
			..focus!

	# jump to reply even if have no selection
	$ '#forum-actions-bottom' .scrollIntoView!