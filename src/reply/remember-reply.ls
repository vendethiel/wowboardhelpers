require! <[../textarea ../topic]>
{$} = require 'lib/dom'

submit = $ '#new-post [type=submit]'

unless textarea.value # i.e. you have to wait for the timeout
	textarea.value = localStorage.getItem "post_#{topic.dataset.id}" or ''

textarea.onkeyup = -> #update on type
	localStorage.setItem "post_#{topic.dataset.id}" @value

submit.onclick = -> #clear on submit
	localStorage.setItem "post_#{topic.dataset.id}" ""

# Watch
if w = require '../w'
	old-cb = w.CharSelect.after-callback
	w.CharSelect.after-callback = !->
		textarea.value = localStorage.getItem "post_#{topic.dataset.id}" or ''
		old-cb!