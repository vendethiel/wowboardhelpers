return unless topic

key-code = 82 #'r' key
return unless textarea = QS '#post-edit textarea'

document.addEventListener 'keydown' ->
	return unless it.keyCode is key-code
	return unless it.target is QS 'html' #not typing
	it.preventDefault!

	if w.getSelection!toString!
		textarea.value += (if textarea.value then "\n" else "") + "[quote]#that[/quote]"
		textarea.selectionStart = textarea.selectionEnd = textarea.value.length
		textarea.focus!
		document.location += '#forum-actions-bottom'