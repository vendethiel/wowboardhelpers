require! <[../../topic ../../cheatsheet/bind-key]>
{$$} = require 'dom'

# cache it cause the script will modify it
if last-post-id = localStorage.getItem "topic_#{topic.dataset.id}"
	bind-key 'jf' 'jump-to-last-read' !->
		last-post-page = Math.ceil last-post-id / 20

		if topic.dataset.page < last-post-page
			document.location = topic.dataset.url + "?page=#last-post-page"
		else
			$$ '.post-detail' .[(last-post-id % 20) - 1]?scrollIntoView!