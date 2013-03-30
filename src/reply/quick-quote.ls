require! <[bind-key dom/$ textarea w]>

bind-key 'r' 'quick-quote' !->
	if w.getSelection!toString!
		textarea.value += (if textarea.value then "\n" else "") + "[quote]#that[/quote]"
		textarea.selectionStart = textarea.selectionEnd = textarea.value.length
		textarea.focus!

	# jump to reply even if have no selection
	$ '#forum-actions-bottom' .scrollIntoView!