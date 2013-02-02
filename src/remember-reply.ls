return unless thread

textarea = QS '#post-edit textarea'
submit = QS '.post [type=submit]'

textarea.value = localStorage.getItem "post_#{thread.dataset.id}" or ''

textarea.onkeyup = -> #update on type
	w.localStorage.setItem "post_#{thread.dataset.id}" @value

submit.onclick = -> #clear on submit
	w.localStorage.removeItem "post_#{thread.dataset.id}"