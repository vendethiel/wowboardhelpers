forum-options = QS '.forum-options'

if topic = document.getElementById 'thread'
	topic.dataset
		..url = topic-url = (document.location / '?')0 - /#[0-9]+/
		..id = (..url / '/')[*-1]
		..page = (document.location == /\?page=([0-9]+)/)?1 or 1

	export textarea = QS '#post-edit textarea'

if forum = document.getElementById 'posts'
	forum.dataset.id = ((document.location / '/')[*-2] / '?')0
	
	export tbody-regular = QS 'tbody.regular'

export topic, forum, forum-options

export cheatsheet = {}

console.log 'Ahhhh…greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !'