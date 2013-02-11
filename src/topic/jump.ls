return unless topic

key-code = 74 #'j' key

document.addEventListener 'keydown' ->
	return unless it.keyCode is key-code
	return unless it.target is QS 'html' #not typing
	it.preventDefault!

	last-post-id = localStorage.getItem "topic_#{topic.dataset.id}"
	document.location = (document.location / '#')0 + "##last-post-id"