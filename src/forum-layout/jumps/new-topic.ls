require! <[../../cheatsheet/bind-key]>
{$} = require 'dom'

# account disabled
unless $ 'a.button1.disabled'
	bind-key 'n' 'new-topic' !->
		document.location += "topic"