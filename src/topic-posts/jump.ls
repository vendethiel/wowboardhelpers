return unless topic

# cache it cause the script will modify it
return unless last-post-id = localStorage.getItem "topic_#{topic.dataset.id}"

key-code = 74 #'j' key
cheatsheet.j = lang.cheatsheet.jump-to-last-read

document.addEventListener 'keydown' ->
	return unless it.keyCode is key-code
	return unless it.target is QS 'html' #not typing
	it.preventDefault!

	last-post-page = Math.ceil last-post-id / 20


	if topic.dataset.page < last-post-page
		document.location = topic.dataset.url + "?page=#last-post-page"
	else
		scroll-to last-post-id