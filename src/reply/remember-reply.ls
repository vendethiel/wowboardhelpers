return unless topic
return unless textarea

submit = QS '.post [type=submit]'

unless textarea.value #i.e. you have to wait for the timeout
	textarea.value = localStorage.getItem "post_#{topic.dataset.id}" or ''

textarea.onkeyup = -> #update on type
	w.localStorage.setItem "post_#{topic.dataset.id}" @value

submit.onclick = -> #clear on submit
	w.localStorage.setItem "post_#{topic.dataset.id}" ""