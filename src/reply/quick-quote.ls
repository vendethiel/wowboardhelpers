require! <[../cheatsheet/bind-key ../textarea ../w]>
{$} = require 'lib/dom'

bind-key 'r' 'quick-quote' !->
	if chrome?tabs?executeScript
		[val] <- that code: 'window.getSelection().toString()'
		fill-quote val
	else if w?getSelection!toString!
		fill-quote that

	function fill-quote
		textarea
			..value += (if ..value then "\n" else "") + "[quote]#it[/quote]"
			..selectionStart = ..selectionEnd = ..value.length
			..focus!

	# jump to reply even if have no selection
	$ '#forum-actions-bottom' .scrollIntoView!