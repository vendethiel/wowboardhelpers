w = unsafeWindow ? window

forum-options = QS '.forum-options'

if topic = document.getElementById 'thread'
	topic.dataset.id = ((document.location / '/')[*-1] / '?')0
else
	export tbody-regular = QS 'tbody.regular'

posts = document.getElementById 'posts'

export w, topic, posts, forum-options