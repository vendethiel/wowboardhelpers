require! <[dom/$ textarea topic]>
submit = $ '.post [type=submit]'

unless textarea.value #i.e. you have to wait for the timeout
	textarea.value = localStorage.getItem "post_#{topic.dataset.id}" or ''

textarea.onkeyup = -> #update on type
	localStorage.setItem "post_#{topic.dataset.id}" @value

submit.onclick = -> #clear on submit
	localStorage.setItem "post_#{topic.dataset.id}" ""