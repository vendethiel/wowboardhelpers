forum-options := QS '.forum-options'

if topic := document.getElementById 'thread'
	topic.dataset.id = ((document.location / '/')[*-1] / '?')0

if forum := document.getElementById 'posts'
	forum.dataset.id = ((document.location / '/')[*-2] / '?')0
	
	tbody-regular := QS 'tbody.regular'

#export topic, forum, forum-options, tbody-regular