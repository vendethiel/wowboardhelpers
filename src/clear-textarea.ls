return unless topic

clearer = template 'clear-textarea'

QS '.editor1'
	textarea = ..querySelector 'textarea'
	..insertBefore clearer, textarea

	clearer.onclick = ->
		textarea.value = ''
		#manually clearing localStorage is something I'd like to avoid
		w.localStorage.removeItem "post_#{topic.dataset.id}"