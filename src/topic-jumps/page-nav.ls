require! <[src/topic src/cheatsheet/bind-key]>
{$} = require 'lib/dom'

cur-page = $ '.ui-pagination li.current'

# prev
if cur-page?previousElementSibling
	bind-key 'aq' 'jump-to-prev-page' !->
		{page, url} = topic.dataset
		document.location = "#url?page=#{--page}"

# next
if cur-page?nextElementSibling
	bind-key 'ed' 'jump-to-next-page' !->
		{page, url} = topic.dataset
		document.location = "#url?page=#{++page}"