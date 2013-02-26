require! '../topic'

# cache it cause the script will modify it
if last-post-id = localStorage.getItem "topic_#{topic.dataset.id}"
	require('../shared/bind-key') 'j' 'jump-to-last-read' !->
		last-post-page = Math.ceil last-post-id / 20

		if topic.dataset.page < last-post-page
			document.location = topic.dataset.url + "?page=#last-post-page"
		else
			QSA '.post-detail' .[(last-post-id % 20) - 1]?scrollIntoView!