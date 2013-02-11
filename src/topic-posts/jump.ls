return unless topic

key-code = 74 #'j' key

document.addEventListener 'keydown' ->
	return unless it.keyCode is key-code
	return unless it.target is QS 'html' #not typing
	it.preventDefault!

	last-post-id = localStorage.getItem "topic_#{topic.dataset.id}"
	last-post-page = Math.ceil last-post-id / 20


	url = if topic.dataset.page < last-post-page
		url = topic.dataset.url + "?page=#last-post-page"
	else document.location

	document.location = url + "##last-post-id"