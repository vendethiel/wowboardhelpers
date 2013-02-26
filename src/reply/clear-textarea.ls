clearer = template 'clear-textarea'

if QS '.editor1'
	that.insertBefore clearer, textarea

	clearer.onclick = ->
		textarea.value = ''
		# manually clearing localStorage is something I'd like to avoid
		# emit an event ?
		w.localStorage.removeItem "post_#{topic.dataset.id}"