return unless topic
return unless textarea

clearer = template 'clear-textarea'

QS '.editor1'
	return unless ..

	..insertBefore clearer, textarea

	clearer.onclick = ->
		textarea.value = ''
		# manually clearing localStorage is something I'd like to avoid
		# emit an event ?
		w.localStorage.removeItem "post_#{topic.dataset.id}"