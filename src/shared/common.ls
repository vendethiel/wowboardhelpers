forum-options = QS '.forum-options'

if topic = document.getElementById 'thread'
	topic.dataset
		..url = topic-url = (document.location / '?')0 - /#[0-9]+/
		..id = (..url / '/')[*-1]
		..page = (document.location == /\?page=([0-9]+)/)?1 or 1

if forum = document.getElementById 'posts'
	forum.dataset.id = ((document.location / '/')[*-2] / '?')0
	
	export tbody-regular = QS 'tbody.regular'

export topic, forum, forum-options

export cheatsheet = {}