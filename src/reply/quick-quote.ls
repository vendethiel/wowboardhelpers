return unless topic
return unless textarea

bind-key 'r' 'quick-quote' !->
	if w.getSelection!toString!
		textarea.value += (if textarea.value then "\n" else "") + "[quote]#that[/quote]"
		textarea.selectionStart = textarea.selectionEnd = textarea.value.length
		textarea.focus!
		QS '#forum-actions-bottom' .scrollIntoView!